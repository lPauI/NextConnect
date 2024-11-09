import streamlit as st
import pandas as pd
import numpy as np
import pydeck as pdk
import os
import logging

from appwrite.client import Client
from appwrite.services.databases import Databases

import toml

with open('secrets.toml', 'r') as f:
    secrets = toml.load(f)

os.environ['NEXT_PUBLIC_APPWRITE_ENDPOINT'] = secrets['NEXT_PUBLIC_APPWRITE_ENDPOINT']
os.environ['NEXT_PUBLIC_PROJECT_ID'] = secrets['NEXT_PUBLIC_PROJECT_ID']
os.environ['NEXT_PUBLIC_DB_ID'] = secrets['NEXT_PUBLIC_DB_ID']
os.environ['NEXT_PUBLIC_EVENTS_COLLECTION_ID'] = secrets['NEXT_PUBLIC_EVENTS_COLLECTION_ID']
os.environ['NEXT_PUBLIC_EMAIL_API_KEY'] = secrets['NEXT_PUBLIC_EMAIL_API_KEY']

client = Client()
client.set_endpoint(os.getenv('NEXT_PUBLIC_APPWRITE_ENDPOINT'))  # Your Appwrite endpoint
client.set_project(os.getenv('NEXT_PUBLIC_PROJECT_ID'))  # Your project ID
client.set_key(os.getenv('NEXT_PUBLIC_EMAIL_API_KEY'))  # Your API key

db = Databases(client)

def get_all_event_tags():
    try:
        # Fetch all documents from the collection
        response = db.list_documents(
            database_id=os.getenv('NEXT_PUBLIC_DB_ID'),
            collection_id=os.getenv('NEXT_PUBLIC_EVENTS_COLLECTION_ID')
        )

        # Extract 'venue' latitude and longitude from each document
        tags = [(doc.get('VENUE_LAT', None), doc.get('VENUE_LONG', None)) for doc in response['documents']]

        return tags
    except Exception as err:
        logging.error("Unable to fetch event tags ❌")
        logging.error(err)
        return []

# Example usage
all_tags = get_all_event_tags()
print(all_tags)

# exit()

def get_data():
    tags = get_all_event_tags()
    df = pd.DataFrame(tags, columns=["lat", "lon"])
    df['lat'] = pd.to_numeric(df['lat'], errors='coerce')
    df['lon'] = pd.to_numeric(df['lon'], errors='coerce')
    return df

st.session_state.df = get_data()

df = st.session_state.df

# Define the layer for the heatmap
layer = pdk.Layer(
    "HeatmapLayer",
    data=df,
    get_position='[lon, lat]',
    radiusPixels=50,
    colorRange=[
        [0, 0, 255, 0],  # Blue
        [0, 255, 255, 128],  # Cyan
        [0, 255, 0, 255],  # Green
        [255, 255, 0, 255],  # Yellow
        [255, 0, 0, 255],  # Red
    ],
)

# Set the viewport location
view_state = pdk.ViewState(
    latitude=df['lat'].mean(),
    longitude=df['lon'].mean(),
    # zoom=10,
    # pitch=50,
)

# Render the deck.gl map
r = pdk.Deck(layers=[layer], initial_view_state=view_state)
st.pydeck_chart(r)
