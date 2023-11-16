var geometry = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-43.06226758147681, -22.6603190674977],
          [-43.06226758147681, -22.774959921381143],
          [-42.948284427179935, -22.774959921381143],
          [-42.948284427179935, -22.6603190674977]]], null, false);
          
 function maskS2clouds(image) {
  var qa = image.select('QA60');

  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;

  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask).divide(10000);
}

var sentinel_inverno = ee.ImageCollection("COPERNICUS/S2")
.filterDate('2022-06-01', '2022-08-31')
.filterBounds(geometry)
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
.map(maskS2clouds)
.map(function(img){return img.clip(geometry)})
.median()
.select(['B2','B3','B4','B8','B11']);

var ndvi_inverno = sentinel_inverno.select('B8')
  .subtract(sentinel_inverno.select('B4'))
  .divide(sentinel_inverno.select('B8')
  .add(sentinel_inverno.select('B4')));

var ndwi_inverno = sentinel_inverno.select('B8')
  .subtract(sentinel_inverno.select('B3'))
  .divide(sentinel_inverno.select('B8')
  .add(sentinel_inverno.select('B3')));

var mndwi_inverno = sentinel_inverno.select('B3')
  .subtract(sentinel_inverno.select('B11').reproject(sentinel_inverno.projection(), null, 10))
  .divide(sentinel_inverno.select('B3')
  .add(sentinel_inverno.select('B11').reproject(sentinel_inverno.projection(), null, 10)));
  
var mmri_inverno = mndwi_inverno.abs()
  .subtract(ndvi_inverno.abs())
  .divide(mndwi_inverno.abs()
  .add(ndvi_inverno.abs()));
  
///////////////////////////////////////////////////////////////////////////////////////////////////

var sentinel_verao = ee.ImageCollection("COPERNICUS/S2")
.filterDate('2022-01-01', '2022-03-31')
.filterBounds(geometry)
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
.map(maskS2clouds)
.map(function(img){return img.clip(geometry)})
.median()
.select(['B2','B3','B4','B8','B11']);

var ndvi_verao = sentinel_verao.select('B8')
  .subtract(sentinel_verao.select('B4'))
  .divide(sentinel_verao.select('B8')
  .add(sentinel_verao.select('B4')));

var ndwi_verao = sentinel_verao.select('B8')
  .subtract(sentinel_verao.select('B3'))
  .divide(sentinel_verao.select('B8')
  .add(sentinel_verao.select('B3')));

var mndwi_verao = sentinel_verao.select('B3')
  .subtract(sentinel_verao.select('B11').reproject(sentinel_verao.projection(), null, 10))
  .divide(sentinel_verao.select('B3')
  .add(sentinel_verao.select('B11').reproject(sentinel_verao.projection(), null, 10)));
  
var mmri_verao = mndwi_verao.abs()
  .subtract(ndvi_verao.abs())
  .divide(mndwi_verao.abs()
  .add(ndvi_verao.abs()));
 
Map.addLayer(mmri_verao, {min: -0.5, max: 0.4}, 'mmri_verao');
Map.addLayer(mmri_inverno, {min: -0.5, max: 0.4}, 'mmri_inverno');

Map.addLayer(mndwi_verao, {min: -0.5, max: 0.4}, 'mndwi_verao');
Map.addLayer(mndwi_inverno, {min: -0.5, max: 0.4}, 'mndwi_inverno');

Map.addLayer(ndvi_verao, {min: -0.5, max: 0.4}, 'ndvi_verao');
Map.addLayer(ndvi_inverno, {min: -0.5, max: 0.4}, 'ndvi_inverno');
