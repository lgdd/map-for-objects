import Alert from "./Alert"

const ConfigurationHelper = () => {
  return (
    <Alert type="info" lead="Configuration Helper:">
      <ul className="mt-2">
        <li>The available properties are: <b><i>id, erc, lat, lng, tooltip, zoom, markerURL, markerSize, hideConfigHelper.</i></b></li>
        <li>Use <b><i>id</i></b> or <b><i>erc</i></b>, if you want this app to display only the location associated with a specific object definition (e.g. <code>id=1234</code> or <code>erc=my-object-definition</code>).</li>
        <li>Use <b><i>lat</i></b> to specify the name of the field to look for latitude (e.g. <code>lat=latitude</code>).</li>
        <li>Use <b><i>lng</i></b> to specify the name of the field to look for longitude (e.g. <code>lng=long</code>).</li>
        <li>Use <b><i>tooltip</i></b> if you want to specify the name of a field that contains the information to display on the marker (e.g. <code>tooltip=myRichTextDescription</code>). By default, it will use the field set for the title of the object definition.</li>
        <li>Use <b><i>zoom</i></b> if you want to specify a zoom level to the map (e.g. <code>zoom=2</code>). By default, the zoom level is 4.</li>
        <li>Use <b><i>tileURL</i></b> if you want to specify the URL to a custom tile set (e.g. <code>tileURL=https://tile.openstreetmap.org/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png</code>).</li>
        <li>Use <b><i>tileAttribution</i></b> if you have set a custom tile set to add the attribution (e.g. <code>tileAttribution='&copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors'</code>).</li>
        <li>Use <b><i>markerURL</i></b> if you want to customize the icon with a PNG image (e.g. <code>markerURL=/path/to/icon.png</code>).</li>
        <li>Use <b><i>markerSize</i></b> if you have set the <code>markerURL</code>, you can specify the size with a JSON array (e.g. <code>markerSize=[52,32]</code>).</li>
        <li>Use <b><i>hideConfigHelper</i></b> if you want to hide this configuration helper (e.g. <code>hideConfigHelper=true</code>).</li>
      </ul>
    </Alert>
  )
}

export default ConfigurationHelper;