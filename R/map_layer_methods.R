
InfoWindow <- function(info_window, mapObject, data, id) UseMethod("InfoWindow")


#' @export
InfoWindow.list <- function(info_window, mapObject, data, id){
  if(is.null(id))
    stop("To use a chart as an Info Window you need to provide an 'id' that links the two data sets together.
         Therefore, specify the 'id' parameter as the common column of data between the two.")

  if(!all(c("data", "type") %in% names(info_window)))
    stop("infow_window list requires a 'data' and 'type' element")

  infoData <- info_window[['data']]
  dataCols <- setdiff(names(infoData), id)

  mapObject[, 'chart_cols'] <- DataTableHeading(infoData, dataCols)

  infoData <- DataTableColumn(df = infoData, id = id, cols = dataCols)

  ## TODO:
  ## chart options
  chartOptions <- info_window[['options']]

  mapObject[, 'chart_type'] <- tolower(info_window[['type']])

  mapObject <- merge(mapObject, infoData, by.x = 'id', by.y = id, all.x = T)
  ## set the info_window property so it is seen in JS
  return(mapObject)
}


#' @export
InfoWindow.character <- function(info_window, mapObject, data, id){
  mapObject[, "info_window"] <- as.character(data[, info_window])
  return(mapObject)
}

#' @export
InfoWindow.default <- function(info_window, mapObject, data, id){
  stop("info_window must either be a list containing data for a chart, or a string specifying the column of data to be used as the info window content")
}
