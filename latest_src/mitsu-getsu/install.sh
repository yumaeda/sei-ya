# JS
cat "../e-commerce/extensions/build/extensions.js"  > "./build/index.js"
cat "../e-commerce/base_classes/HtmlControl.js"    >> "./build/index.js"
cat "./imports.js"                                 >> "./build/index.js"
cat "../common/js/EventControl.js"                 >> "./build/index.js"
cat "../common/js/SubMenuColumn.js"                >> "./build/index.js"
cat "../common/js/SubMenuTable.js"                 >> "./build/index.js"
cat "../common/js/BaseMenu.js"                     >> "./build/index.js"
cat "js/MitsuGetsuMenu.js"                         >> "./build/index.js"
cat "../common/js/OfuroUtility.js"                 >> "./build/index.js"
cat "../common/js/ContactInfo.js"                  >> "./build/index.js"
cat "../common/js/MapControl.js"                   >> "./build/index.js"
cat "../common/js/IntlHtmlControl.js"              >> "./build/index.js"
cat "../common/js/ProfileControl.js"               >> "./build/index.js"
cat "../common/js/PhotoControl.js"                 >> "./build/index.js"
cat "../common/js/BeerControl.js"                  >> "./build/index.js"
cat "../common/js/DrinkControl.js"                 >> "./build/index.js"
cat "../common/js/BrandyControl.js"                >> "./build/index.js"
cat "../common/js/DailyMenuControl.js"             >> "./build/index.js"
cat "../common/js/DishMenuControl.js"              >> "./build/index.js"
cat "../common/js/RestaurantWineList.js"           >> "./build/index.js"
cat "../common/js/RecommendedWineControl.js"       >> "./build/index.js"
cat "../common/js/AllWineControl.js"               >> "./build/index.js"
cat "js/index.js"                                  >> "./build/index.js"

# CSS
cat "../common/css/default.css"                  > "./build/index.css"
cat "../common/css/base_page.css"               >> "./build/index.css"
cat "../common/css/MapControl.css"              >> "./build/index.css"
cat "../common/css/EventControl.css"            >> "./build/index.css"
cat "../common/css/SubMenuColumn.css"           >> "./build/index.css"
cat "../common/css/BaseMenu.css"                >> "./build/index.css"
cat "../common/css/FontSize.css"                >> "./build/index.css"
cat "../common/css/Etc.css"                     >> "./build/index.css"
cat "../common/css/DailyMenuControl.css"        >> "./build/index.css"
cat "../e-commerce/modules/css/ModalWindow.css" >> "./build/index.css"

