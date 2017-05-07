
#' Data Table Column
#'
#' Creates the javascript that's used in a Google Data Table Visualisation from
#' the specified columns of a data.frame
#'
#' @param df data.frame
#' @param cols columns
DataTableColumn <- function(df, id, cols){

  info_window <- sapply(1:nrow(df), function(x) jsonlite::toJSON( list("c" =  df[x, cols] )))
  df$info_window <- gsub(paste0(cols, collapse = "|"), replacement = "v", gsub(",","},{",info_window))

  df <- aggregate(formula(paste0("info_window ~ ", id)), data = df, FUN = collapseJson)
  return(df)
}


collapseJson <- function(x) paste0('"rows":[', paste0(x, collapse = ","),']' )


#' @export
JsonType <- function(x) UseMethod("JsonType")

#' @export
JsonType.character <- function(x) return("string")
#' @export
JsonType.Date <- function(x) return("string")
#' @export
JsonType.factor <- function(x) return("string")
#' @export
JsonType.integer <- function(x) return("number")
#' @export
JsonType.logical <- function(x) return("boolean")
#' @export
JsonType.numeric <- function(x) return("number")
#' @export
JsonType.POSIXct <- function(x) return("string")
#' @export
JsonType.default <- function(x) return("string")
