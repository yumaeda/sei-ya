<?php

$dbTables = array(
    "mitsugetsu_dishes" => array(
        "sort_order",
        "category",
        "name",
        "loc_name",
        "daily",
        "price",
        "market_price",
        "comment"
    ),

    "mitsugetsu_drinks" => array(
        "sort_order",
        "category",
        "name",
        "loc_name",
        "price",
        "market_price",
        "comment"
    ),

    "mitsugetsu_events" => array(
        "sort_order",
        "year",
        "month",
        "date",
        "description"
    ),

    "mitsugetsu_photos" => array(
        "sort_order",
        "category",
        "dir",
        "filename",
        "comment"
    ),

    "mitsugetsu_profiles" => array(
        "sort_order",
        "name",
        "phonetic",
        "position",
        "prefecture",
        "career_history",
        "favorite",
        "filename"
    ),

    "mitsugetsu_recommended_wines" => array(
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

    "mitsugetsu_winelist" => array(
        "page_number",
        "item_number",
        "name",
        "name_jpn",
        "region",
        "region_jpn",
        "comment"
    ),

    "mitsugetsu_wines" => array(
        "region",
        "region_jpn",
        "type",
        "int_country",
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
