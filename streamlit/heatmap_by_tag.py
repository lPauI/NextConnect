import streamlit as st
import pandas as pd
import pydeck as pdk
import os
import logging
from appwrite.client import Client
from appwrite.services.databases import Databases

def init_appwrite():
    client = Client()
    client.set_endpoint(os.getenv('NEXT_PUBLIC_APPWRITE_ENDPOINT')) \
          .set_project(os.getenv('NEXT_PUBLIC_PROJECT_ID')) \
          .set_key(os.getenv('APPWRITE_API_KEY'))
    return client

def get_data():
    client = init_appwrite()
    databases = Databases(client)
    try:
        response = databases.list_documents(
            database_id=os.getenv('NEXT_PUBLIC_DB_ID'),
            collection_id=os.getenv('NEXT_PUBLIC_EVENTS_COLLECTION_ID')
        )

        desired_tags = st.query_params.get("tag", [])
        
        data = []
        for doc in response['documents']:
            tags = doc.get('tags', [])
            for tag in tags:
                if desired_tags in tag:
                    lat = doc.get('VENUE_LAT', None)
                    lon = doc.get('VENUE_LONG', None)
                    title = doc.get('title', '')
                    data.append((lat, lon, title, tags))
                    break

        df = pd.DataFrame(data, columns=["lat", "lon", "title", "tags"])
        df['lat'] = pd.to_numeric(df['lat'], errors='coerce')
        df['lon'] = pd.to_numeric(df['lon'], errors='coerce')
        return df
    except Exception as err:
        logging.error("Unable to fetch event tags ❌")
        logging.error(err)

        return pd.DataFrame(columns=["lat", "lon", "title", "tags"])


df = get_data()

heatmap_layer = pdk.Layer(
    "HeatmapLayer",
    data=df,
    get_position='[lon, lat]',
    radiusPixels=50,
    colorRange=[
        [0, 0, 255, 0],
        [0, 0, 255, 85],
        [0, 0, 255, 170],
        [0, 0, 255, 255],
    ],
    threshold=0.1,
    opacity=0.8,
)

text_layer = pdk.Layer(
    "TextLayer",
    data=df,
    get_position='[lon, lat]',
    get_text='title',
    get_size=16,
    get_color=[255, 255, 255],
    get_angle=0,
    text_anchor='"middle"',
    text_baseline='"bottom"',
    pickable=True,
)

if len(df) > 0 and df['lat'].notnull().any() and df['lon'].notnull().any():
    view_state = pdk.ViewState(
        latitude=df['lat'].mean(),
        longitude=df['lon'].mean(),
        zoom=10,
    )
else:
    view_state = pdk.ViewState(
        latitude=0,
        longitude=0,
        zoom=2,
    )

r = pdk.Deck(
    layers=[heatmap_layer, text_layer],
    initial_view_state=view_state
)

st.set_page_config(layout="wide")

st.pydeck_chart(r)
