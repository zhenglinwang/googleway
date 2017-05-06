
JsonType <- function(x) UseMethod("JsonType")

JsonType.character <- function(x) return("string")
JsonType.Date <- function(x) return("string")
JsonType.factor <- function(x) return("string")
JsonType.integer <- function(x) return("number")
JsonType.logical <- function(x) return("boolean")
JsonType.numeric <- function(x) return("number")
JsonType.POSIXct <- function(x) return("string")

JsonType.default <- function(x) return("string")
