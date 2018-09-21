<?php

$dbTables = array(
    "ofuro_dishes" => array(
        "sort_order",
        "category",
        "name",
        "loc_name",
        "daily",
        "price",
        "market_price",
        "comment"
    ),

    "ofuro_drinks" => array(
        "sort_order",
        "category",
        "name",
        "loc_name",
        "price",
        "market_price",
        "comment"
    ),

    "ofuro_events" => array(
        "sort_order",
        "year",
        "month",
        "date",
        "description"
    ),

    "ofuro_glass_wines" => array(
        "sort_order",
        "color",
        "country",
        "region",
        "region_jpn",
        "name",
        "name_jpn",
        "producer",
        "producer_jpn",
        "vintage",
        "cepage",
        "price",
        "comment"
    ),

    "ofuro_photos" => array(
        "sort_order",
        "category",
        "dir",
        "filename",
        "comment"
    ),

    "ofuro_profiles" => array(
        "sort_order",
        "name",
        "phonetic",
        "position",
        "prefecture",
        "career_history",
        "favorite",
        "filename"
    ),

    "ofuro_recommended_wines" => array(
        "page_number",
        "color",
        "item_number",
        "barcode_number",
        "country",
        "vintage",
        "name",
        "producer",
        "name_jpn",
        "producer_jpn",
        "region_jpn",
        "cepage",
        "store_price",
        "quantity",
        "comment"
    ),

    "ofuro_sakes" => array(
        "sort_order",
        "vintage",
        "category",
        "bottling_method",
        "ingredient",
        "name",
        "romaji_name",
        "hiragana_name",
        "producer",
        "glass_price",
        "tokkuri_price"
    ),

    "ofuro_shochus" => array(
        "sort_order",
        "vintage",
        "category",
        "ingredient",
        "name",
        "romaji_name",
        "hiragana_name",
        "alcohol",
        "producer",
        "volume",
        "price"
    ),

    "ofuro_wines" => array(
        "region",
        "region_jpn",
        "type",
        "country",
        "producer",
        "producer_jpn",
        "vintage",
        "store_price",
        "name",
        "name_jpn",
        "sort_order",
        "general_region",
        "aoc_order"
    )
);

?>
