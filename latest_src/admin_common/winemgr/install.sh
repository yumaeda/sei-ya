# JS
cat "../../e-commerce/extensions/build/extensions.js"  > "./build/index.js"
cat "./imports.js"                                    >> "./build/index.js"
cat "./RecommendedWineManager.js"                     >> "./build/index.js"
cat "./index.js"                                      >> "./build/index.js"

# CSS
cat "./index.css" > "./build/index.css"
