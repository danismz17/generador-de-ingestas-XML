function accionBoton() {
  try {
    window.location.href = document.getElementById("SelecContenido").value;
  } catch (error) {}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", onWindowsLoad);

function onWindowsLoad() {
  try {
    btnCrearXML = document.querySelector("#btnCrearXML");
    btnCrearXML.addEventListener("click", CreateXML);
  } catch (error) {}

  try {
    btnCrearXML = document.querySelector("#btncargaXMLAux");
    btnCrearXML.addEventListener("click", cargarXMLaux);
  } catch (error) {}
}

//Los defino acá porque se usa en dos funciones distintas
let tipoSeleccionado;
let xmlAuxiliarContent;

function cargarXMLaux() {
  tipoSeleccionado = document.querySelector("#tipoSeleccionado").innerHTML;
  if (
    tipoSeleccionado == "XML para temporadas" ||
    tipoSeleccionado == "XML para capítulos"
  ) {
    let msg = document.querySelector("#msgCargaAux");
    let xmlAuxiliar = document.querySelector("#cargaXMLAux").files[0]; //lo agregue
    if (xmlAuxiliar) {
      let reader = new FileReader();
      reader.readAsText(xmlAuxiliar, "UTF-8");
      reader.onload = function () {
        xmlAuxiliarContent = reader.result;
      };
      msg.innerHTML = "<span style='color: green;'>Archivo cargado</span>";
    } else {
      msg.innerHTML =
        "<span style='color: red;'>Debe seleccionar un archivo</span>";
    }
  }
}

function CreateXML() {
  tipoSeleccionado = document.querySelector("#tipoSeleccionado").innerHTML;
  let provedoor = document.querySelector("#nombreProveedor").value;
  let idProveedor = document.querySelector("#idProveedor").value;
  let numeroContenido = document.querySelector("#numeroContenido").value;
  let tituloContenido = document.querySelector("#tituloContenido").value;
  let descCorta = document.querySelector("#descCorta").value;
  let descLarga = document.querySelector("#descLarga").value;
  let genero = document.querySelector("#genero").value;
  let idioma = document.querySelector("#idioma").value;
  let clasEdad = document.querySelector("#clasEdad").value;
  let idAño = document.querySelector("#idAño").value;
  let pais = document.querySelector("#pais").value;
  let tipoContenido = document.querySelector("#tipoContenido").value;
  let contenidoHD = document.querySelector("#contenidoHD").value;
  let fechaInicio = document.querySelector("#fechaInicio").value;
  let fechaFin = document.querySelector("#fechaFin").value;

  let actor1;
  let actor2;
  let director;
  let imagenHorizontal;
  let imagenVertical;

  let video;
  let nEpisodio;
  let trailer;
  let imagenTrailerVertical;
  let subtitulos;

  if (tipoSeleccionado != "XML para relicencias") {
    actor1 = document.querySelector("#actor1").value;
    actor2 = document.querySelector("#actor2").value;
    director = document.querySelector("#director").value;
    imagenHorizontal = document.querySelector("#imagenHorizontal").value;
    imagenVertical = document.querySelector("#imagenVertical").value;
  }

  //Esto es para capitulos y/o temporadas
  let showName;
  let showID;
  let seriesID;
  let seriesName;
  let seriesOrdinal;

  if (
    tipoSeleccionado ==
    "XML para peliculas con trailer" /*|| tipoSeleccionado == "lo que vaya"*/
  ) {
    trailer = tieneTriler();
  }

  if (
    tipoSeleccionado ==
    "XML para peliculas con subtitulos y trailer" /*|| tipoSeleccionado == "lo que vaya"*/
  ) {
    imagenTrailerVertical = tieneImagenTrailerVertical();
    trailer = tieneTriler();
    subtitulos = tieneSubtitulos();
  }

  if (
    tipoSeleccionado ==
    "XML para peliculas con subtitulos" /*|| tipoSeleccionado == "lo que vaya"*/
  ) {
    subtitulos = tieneSubtitulos();
  }

  if (
    tipoSeleccionado ==
    "XML para capítulos" /*|| tipoSeleccionado == "lo que vaya"*/
  ) {
    nEpisodio = document.querySelector("#nEpisodio").value;
    showName = getValueToXML(xmlAuxiliarContent, "Series_Name");
    showID = getValueToXML(xmlAuxiliarContent, "Show_ID");
    seriesID = getValueToXML(xmlAuxiliarContent, "Series_ID");
    seriesName = getValueToXML(xmlAuxiliarContent, "Title_Brief");
    seriesOrdinal = getValueToXML(xmlAuxiliarContent, "Series_Ordinal");
  }

  if (tipoSeleccionado == "XML para temporadas") {
    showName = getValueToXML(xmlAuxiliarContent, "Show_Name");
    showID = getValueToXML(xmlAuxiliarContent, "Show_ID");
  }

  if (
    tipoSeleccionado != "XML para temporadas" &&
    tipoSeleccionado != "XML para series" &&
    tipoSeleccionado != "XML para relicencias"
  ) {
    video = tieneVideo();
  }

  if (
    provedoor ==
    "" /* || idProveedor == "" || numeroContenido == "" || tituloContenido == "" */
  ) {
    alert("Debe completar todos los campos");
  } else {
    idProveedor = CorregiridProvedor(idProveedor);
    numeroContenido = CorregirnumeroContenido(numeroContenido);
    imagenHorizontal = getFileName(imagenHorizontal);
    imagenVertical = getFileName(imagenVertical);
    let Billing_ID = getBillingID(idProveedor, numeroContenido);

    let xml;

    switch (tipoSeleccionado) {
      case "XML para peliculas":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
          <ADI>
            <Metadata>
            <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
              <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
            </Metadata>
            <Asset>
              <Metadata>
                <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="title"/>
                <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
                <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:02:16"/>
                <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:02"/>
                <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
                <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
                <App_Data App="${tipoContenido}" Name="Show_Type" Value="Movie"/>
                <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
                <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
                <App_Data App="${tipoContenido}" Name="Actors_Display" Value="${actor1}, ${actor2}"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
                <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
                <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
                <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
                <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
              </Metadata>
              <Asset>
                <Metadata>
                  <AMS Asset_Class="movie" Asset_ID="CONT_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} movie" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                  <App_Data App="${tipoContenido}" Name="Type" Value="movie"/>
                  <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo"/>
                  <App_Data App="${tipoContenido}" Name="HDContent" Value="${contenidoHD}"/>
                  <App_Data App="${tipoContenido}" Name="Languages" Value="${idioma}"/>
                  <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="63054041"/>
                  <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
                </Metadata>
                <Content Value="${video}"/>
              </Asset>
              <Asset>
                <Metadata>
                  <AMS Asset_Class="poster" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                  <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                  <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                  <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="80624915"/>
                  <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
                </Metadata>
                <Content Value="${imagenHorizontal}"/>
              </Asset>
              <Asset>
                <Metadata>
                  <AMS Asset_Class="poster" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                  <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                  <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400"/>
                  <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="2835191"/>
                  <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
                </Metadata>
                <Content Value="${imagenVertical}"/>
              </Asset>  
            </Asset>	
          </ADI>`;
        break;

      case "XML para peliculas con trailer":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ADI>
          <Metadata>
          <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
            <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
          </Metadata>
          <Asset>
            <Metadata>
              <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
              <App_Data App="${tipoContenido}" Name="Type" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
              <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:05:00"/>
              <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:05"/>
              <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
              <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
              <App_Data App="${tipoContenido}" Name="Show_Type" Value="Movie"/>
              <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
              <App_Data App="${tipoContenido}" Name="Actors_Display" Value="${actor1}, ${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
              <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
            </Metadata>
            <Asset>
              <Metadata>
                <AMS Asset_Class="movie" Asset_ID="CONT_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} movie" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="movie"/>
                <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo"/>
                <App_Data App="${tipoContenido}" Name="HDContent" Value="${contenidoHD}"/>
                <App_Data App="${tipoContenido}" Name="Languagen" Value="${idioma}"/>
                <App_Data App="${tipoContenido}" Name="Content_Filenize" Value="95694740"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
          <Content Value="${video}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="preview" Asset_ID="PREV_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} preview" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="preview"/>
                <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo"/>
                <App_Data App="${tipoContenido}" Name="HDContent" Value="${contenidoHD}"/>
                <App_Data App="${tipoContenido}" Name="Languagen" Value="${idioma}"/>
                <App_Data App="${tipoContenido}" Name="Content_Filenize" Value="95694740"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${trailer}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                <App_Data App="${tipoContenido}" Name="Content_Filenize" Value="283496"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenHorizontal}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400"/>
                <App_Data App="${tipoContenido}" Name="Content_Filenize" Value="202992"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenVertical}"/>
            </Asset>  
          </Asset>	
        </ADI>`;
        break;

      case "XML para peliculas con subtitulos":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ADI>
          <Metadata>
          <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
            <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
          </Metadata>
          <Asset>
            <Metadata>
              <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
              <App_Data App="${tipoContenido}" Name="Type" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
              <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:05:00"/>
              <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:05"/>
              <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
              <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
              <App_Data App="${tipoContenido}" Name="Show_Type" Value="Movie"/>
              <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
              <App_Data App="${tipoContenido}" Name="Actors_Display" Value="Vittorio Gassman, Renato Salvatori, Carla Gravina"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
              <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
            </Metadata>
            <Asset>
              <Metadata>
                <AMS Asset_Class="movie" Asset_ID="CONT_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} movie" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="movie"/>
                <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo"/>
                <App_Data App="${tipoContenido}" Name="HDContent" Value="${contenidoHD}"/>
                <App_Data App="${tipoContenido}" Name="Languages" Value="${idioma}"/>
                <App_Data App="${tipoContenido}" Name="Subtitle_Languages" Value="es"/>
                <App_Data App="${tipoContenido}" Name="Subtitle_File" Value="${subtitulos}"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="95694740"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${video}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="283496"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenHorizontal}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="202992"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenVertical}"/>
            </Asset>  
          </Asset>	
        </ADI>`;
        break;

      case "XML para peliculas con subtitulos y trailer":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ADI>
          <Metadata>
              <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido}" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido}" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Class="package" />
              <App_Data Value="CableLabsVOD1.1" Name="Metadata_Spec_Version" App="${tipoContenido}" />
              <App_Data Value="For Cable" Name="Provider_Content_Tier" App="${tipoContenido}" />
          </Metadata>
          <Asset>
              <Metadata>
                <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido} Title" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido}" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Class="title" />
                <App_Data Value="${tituloContenido}" Name="Type" App="${tipoContenido}" />
                <App_Data Value="Cable Company" Name="Rights" App="${tipoContenido}" />
                <App_Data Value="${clasEdad}" Name="Rating" App="${tipoContenido}" />
                <App_Data Value="02:38:12" Name="Run_Time" App="${tipoContenido}" />
                <App_Data Value="02:38" Name="Display_Run_Time" App="${tipoContenido}" />
                <App_Data Value="${idAño}" Name="Year" App="${tipoContenido}" />
                <App_Data Value="${pais}" Name="Country_of_Origin" App="${tipoContenido}" />
                <App_Data Value="DIS" Name="Studio_Code" App="${tipoContenido}" />
                <App_Data Value="veraTV" Name="Studio_Name" App="${tipoContenido}" />
                <App_Data Value="Movie" Name="Show_Type" App="${tipoContenido}" />
                <App_Data Value="01:00:00" Name="Maximum_Viewing_Length" App="${tipoContenido}" />
                <App_Data Value="${tipoContenido} - Movies on DemandAction Adventure" Name="Category" App="${tipoContenido}" />
                <App_Data Value="${tipoContenido} - Movies on DemandAll Movies A-Z" Name="Category" App="${tipoContenido}" />
                <App_Data Value="${tipoContenido} - Movies on DemandNew Releases" Name="Category" App="${tipoContenido}" />
                <App_Data Value="${genero}" Name="Genre" App="${tipoContenido}" />
                <App_Data Value="${actor1}, ${actor2}" Name="Actors_Display" App="${tipoContenido}" />
                <App_Data Value="${actor1}" Name="Actors" App="${tipoContenido}" />
                <App_Data Value="${actor2}" Name="Actors" App="${tipoContenido}" />
                <App_Data Value="${director}" Name="Director" App="${tipoContenido}" />
                <App_Data Value="${Billing_ID}" Name="Billing_ID" App="${tipoContenido}" />
                <App_Data Value="11909025" Name="Publish_ID" App="${tipoContenido}" />
                <App_Data Value="${fechaInicio}:00" Name="Licensing_Window_Start" App="${tipoContenido}" />
                <App_Data Value="${fechaFin}:00" Name="Licensing_Window_End" App="${tipoContenido}" />
                <App_Data Value="1" Name="Propagation_Priority" App="${tipoContenido}" />
                <App_Data Value="99.00" Name="Suggested_Price" App="${tipoContenido}" />
                <App_Data Value="${idioma}" Name="Original_Language" App="${tipoContenido}" />
                <App_Data App="${tipoContenido}" Name="${tituloContenido}" Language="${idioma}" />
                <App_Data App="${tipoContenido}" Name="Title_Brief" Value="${tituloContenido}" Language="${idioma}" />
                <App_Data App="${tipoContenido}" Name="Title_Sort_Name" Value="${tituloContenido}" Language="${idioma}" />
                <App_Data App="${tipoContenido}" Name="Summary_Short" Value="${descCorta}" Language="${idioma}" />
                <App_Data App="${tipoContenido}" Name="Summary_Long" Value="${descLarga}" Language="${idioma}" />
                <App_Data Value="${provedoor}" Name="Provider_QA_Contact" App="${tipoContenido}" />
              </Metadata>
              <Asset>
                <Metadata>
                    <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido} Movie" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido}" Asset_ID="CONT_${idProveedor}_${numeroContenido}" Asset_Class="movie" />
                    <App_Data Value="movie" Name="Type" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo" />
                    <App_Data Value="${contenidoHD}" Name="HDContent" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Languages" Value="${idioma}" />
                    ${
                      subtitulos == ""
                        ? ""
                        : `<App_Data App="${tipoContenido}" Name="Subtitle_Languages" Value="es"/>`
                    }                    
                    ${
                      subtitulos == ""
                        ? ""
                        : `<App_Data App="${tipoContenido}" Name="Subtitle_File" Value="${subtitulos}"/>`
                    }
                    ${
                      subtitulos == ""
                        ? ""
                        : `<App_Data App="${tipoContenido}" Name="Dubbed_Languages" Value="es" />`
                    }
                    <App_Data Value="Y" Name="Encryption" App="${tipoContenido}" />
                    <App_Data Value="Widescreen" Name="Screen_Format" App="${tipoContenido}" />
                    <App_Data Value="15000" Name="Bit_Rate" App="${tipoContenido}" />
                    <App_Data Value="Y" Name="Copy_Protection" App="${tipoContenido}" />
                    <App_Data Value="Y" Name="Copy_Protection_Verbose" App="${tipoContenido}" />
                    <App_Data Value="1" Name="Analog_Protection_System" App="${tipoContenido}" />
                    <App_Data Value="3" Name="Encryption_Mode_Indicator" App="${tipoContenido}" />
                    <App_Data Value="3" Name="CGMS_A" App="${tipoContenido}" />
                    <App_Data Value="1316033652" Name="Content_Filesize" App="${tipoContenido}" />
                    <App_Data Value="ce45763f8b24e572444199255a0c0d49" Name="Content_Checksum" App="${tipoContenido}" />
                </Metadata>
                <Content Value="${video}" />
              </Asset>
              <Asset>
                <Metadata>
                    <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido}" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido} T" Asset_ID="PREV_${idProveedor}_${numeroContenido}" Asset_Class="preview" />
                    <App_Data Value="preview" Name="Type" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo" />
                    <App_Data Value="Widescreen" Name="Screen_Format" App="${tipoContenido}" />
                    <App_Data Value="3750" Name="Bit_Rate" App="${tipoContenido}" />
                    <App_Data Value="N" Name="Encryption" App="${tipoContenido}" />
                    <App_Data Value="N" Name="HD_Content" App="${tipoContenido}" />
                    <App_Data Value="PG" Name="Rating" App="${tipoContenido}" />
                    <App_Data Value="00:01:00" Name="Run_Time" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Languages" Value="${idioma}" />
                    ${
                      subtitulos == ""
                        ? ""
                        : `<App_Data Value="es" Name="Subtitle_Languages" App="${tipoContenido}" />`
                    }                    
                    <App_Data Value="274696388" Name="Content_Filesize" App="${tipoContenido}" />
                </Metadata>
                <Content Value="${trailer}" />
              </Asset>
              <Asset>
                <Metadata>
                    <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido} Poster" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido}" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Class="poster" />
                    <App_Data Value="poster" Name="Type" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080" />
                    <App_Data Value="4280453" Name="Content_Filesize" App="${tipoContenido}" />
                    <App_Data Value="4ddf9fbe8db3a40d98209a4fa6560663" Name="Content_Checksum" App="${tipoContenido}" />
                </Metadata>
                <Content Value="${imagenHorizontal}" />
              </Asset>
              <Asset>
                <Metadata>
                    <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido} Poster" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido}" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Class="poster" />
                    <App_Data Value="poster" Name="Type" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400" />
                    <App_Data Value="2630993" Name="Content_Filesize" App="${tipoContenido}" />
                    <App_Data Value="92883eea810b4f74056356e9dda3bc3e" Name="Content_Checksum" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Related_To" Value="title" />
                </Metadata>
                <Content Value="${imagenVertical}" />
              </Asset>
              <Asset>
                <Metadata>
                    <AMS Verb="" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Description="${tituloContenido} Poster" Creation_Date="${idAño}" Version_Major="1" Version_Minor="0" Asset_Name="${tituloContenido}" Asset_ID="IMAT_1_${idProveedor}_${numeroContenido}" Asset_Class="poster" />
                    <App_Data Value="poster" Name="Type" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400" />
                    <App_Data Value="2630993" Name="Content_Filesize" App="${tipoContenido}" />
                    <App_Data Value="92883eea810b4f74056356e9dda3bc3e" Name="Content_Checksum" App="${tipoContenido}" />
                    <App_Data App="${tipoContenido}" Name="Related_To" Value="preview" />
                </Metadata>
                <Content Value="${imagenTrailerVertical}" />
              </Asset>
          </Asset>
        </ADI>`;
        break;

      case "XML para series":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ADI>
          <Metadata>
          <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
            <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
          </Metadata>
          <Asset>
            <Metadata>
              <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
              <App_Data App="${tipoContenido}" Name="Type" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Name="Show_Name" Value="${tituloContenido}" />
              <App_Data App="${tipoContenido}" Name="Show_ID" Value="${Billing_ID}" />
              <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
              <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:00:16"/>
              <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:00"/>
              <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
              <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
              <App_Data App="${tipoContenido}" Name="Show_Type" Value="Series"/>
              <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
              <App_Data App="${tipoContenido}" Name="Actors_Display" Value="${actor1}, ${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
              <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
            </Metadata>
            <Asset>
              <Metadata>
                <AMS Asset_Class="box cover" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} box cover" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="box cover"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="236823"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenHorizontal}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="138615"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenVertical}"/>
            </Asset>  
          </Asset>	
        </ADI>`;
        break;

      case "XML para temporadas":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ADI>
          <Metadata>
          <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
            <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
          </Metadata>
          <Asset>
            <Metadata>
              <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
              <App_Data App="${tipoContenido}" Name="Type" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Name="Show_ID" Value="${showID}"/> 
              <App_Data App="${tipoContenido}" Name="Series_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Series_Name" Value="${showName}"/>
              <App_Data App="${tipoContenido}" Name="Series_Ordinal" Value="1"/>
              <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
              <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:45:00"/>
              <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:45"/>
              <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
              <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
              <App_Data App="${tipoContenido}" Name="Show_Type" Value="Series"/>
              <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
              <App_Data App="${tipoContenido}" Name="Actors_Display" Value="${actor1}, ${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
              <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
            </Metadata>
            <Asset>
              <Metadata>
                <AMS Asset_Class="box cover" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} box cover" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="box cover"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="713453"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenHorizontal}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="379778"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenVertical}"/>
            </Asset>  
          </Asset>	
        </ADI>`;
        break;

      case "XML para capítulos":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
        <ADI>
          <Metadata>
          <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
            <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
          </Metadata>
          <Asset>
            <Metadata>
              <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
              <App_Data App="${tipoContenido}" Name="Type" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Name="Episode_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Show_Name" Value="${showName}"/>
              <App_Data App="${tipoContenido}" Name="Show_ID" Value="${showID}"/>
              <App_Data App="${tipoContenido}" Name="Series_ID" Value="${seriesID}"/>
              <App_Data App="${tipoContenido}" Name="Series_Name" Value="${seriesName}"/>
              <App_Data App="${tipoContenido}" Name="Series_Ordinal" Value="${seriesOrdinal}"/>
              <App_Data App="${tipoContenido}" Name="Episode_Ordinal" Value="${nEpisodio}"/>
              <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
              <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:01:47"/>
              <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:01"/>
              <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
              <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
              <App_Data App="${tipoContenido}" Name="Show_Type" Value="Series"/>
              <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
              <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
              <App_Data App="${tipoContenido}" Name="Actors_Display" Value="${actor1}, ${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
              <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
              <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
              <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
            </Metadata>
            <Asset>
              <Metadata>
                <AMS Asset_Class="movie" Asset_ID="CONT_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Movie" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="movie"/>
                <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo"/>
                <App_Data App="${tipoContenido}" Name="HDContent" Value="${contenidoHD}"/>
                <App_Data App="${tipoContenido}" Name="Languages" Value="${idioma}"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="7181983"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${video}"/>
            </Asset>
            <Asset>
              <Metadata>
                <AMS Asset_Class="poster" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="323899"/>
                <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
              </Metadata>
              <Content Value="${imagenHorizontal}"/>
            </Asset>
          </Asset>	
        </ADI>`;
        break;

      case "XML para otros contenidos":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
            <ADI>
              <Metadata>
              <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
              </Metadata>
              <Asset>
                <Metadata>
                  <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                  <App_Data App="${tipoContenido}" Name="Type" Value="title"/>
                  <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
                  <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:02:16"/>
                  <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:02"/>
                  <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
                  <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
                  <App_Data App="${tipoContenido}" Name="Show_Type" Value="Other"/>
                  <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
                  <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
                  <App_Data App="${tipoContenido}" Name="Actors_Display" Value="${actor1}, ${actor2}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor1}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Actors" Value="${actor2}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Director" Value="${director}"/>
                  <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
                  <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
                  <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
                </Metadata>
                <Asset>
                  <Metadata>
                    <AMS Asset_Class="movie" Asset_ID="CONT_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} movie" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                    <App_Data App="${tipoContenido}" Name="Type" Value="movie"/>
                    <App_Data App="${tipoContenido}" Name="Audio_Type" Value="Stereo"/>
                    <App_Data App="${tipoContenido}" Name="HDContent" Value="${contenidoHD}"/>
                    <App_Data App="${tipoContenido}" Name="Languages" Value="${idioma}"/>
                    <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="63054041"/>
                    <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
                  </Metadata>
                  <Content Value="${video}"/>
                </Asset>
                <Asset>
                  <Metadata>
                    <AMS Asset_Class="poster" Asset_ID="IMAG_1_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                    <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                    <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1920x1080"/>
                    <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="80624915"/>
                    <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
                  </Metadata>
                  <Content Value="${imagenHorizontal}"/>
                </Asset>
                <Asset>
                  <Metadata>
                    <AMS Asset_Class="poster" Asset_ID="IMAG_2_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} poster" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                    <App_Data App="${tipoContenido}" Name="Type" Value="poster"/>
                    <App_Data App="${tipoContenido}" Name="Image_Aspect_Ratio" Value="1000x1400"/>
                    <App_Data App="${tipoContenido}" Name="Content_Filesize" Value="2835191"/>
                    <App_Data App="${tipoContenido}" Name="Content_Checksum" Value=""/>
                  </Metadata>
                  <Content Value="${imagenVertical}"/>
                </Asset>  
              </Asset>	
            </ADI>`;
        break;

      case "XML para relicencias":
        xml = `<?xml version="1.0" encoding="UTF-8"?>
            <ADI>
              <Metadata>
              <AMS Asset_Class="package" Asset_ID="PACK_${idProveedor}_${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Package" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                <App_Data App="${tipoContenido}" Name="Metadata_Spec_Version" Value="CableLabsSOD1.1"/>
              </Metadata>
              <Asset>
                <Metadata>
                  <AMS Asset_Class="title" Asset_ID="${numeroContenido}" Asset_Name="${tituloContenido}" Creation_Date="${idAño}" Description="${tituloContenido} Title" Product="${tipoContenido}" Provider="${provedoor}" Provider_ID="${idProveedor}" Verb="" Version_Major="1" Version_Minor="0"/>
                  <App_Data App="${tipoContenido}" Name="Type" Value="title"/>
                  <App_Data App="${tipoContenido}" Name="Rating" Value="${clasEdad}"/>
                  <App_Data App="${tipoContenido}" Name="Run_Time" Value="00:02:16"/>
                  <App_Data App="${tipoContenido}" Name="Display_Run_Time" Value="00:02"/>
                  <App_Data App="${tipoContenido}" Name="Year" Value="${idAño}"/>
                  <App_Data App="${tipoContenido}" Name="Country_of_Origin" Value="${pais}"/>
                  <App_Data App="${tipoContenido}" Name="Show_Type" Value="Movie"/>
                  <App_Data App="${tipoContenido}" Name="Category" Value="${genero}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Genre" Value="${genero}"/>
                  <App_Data App="${tipoContenido}" Name="Original_Language" Value="${idioma}"/>
                  <App_Data App="${tipoContenido}" Name="Billing_ID" Value="${Billing_ID}"/>
                  <App_Data App="${tipoContenido}" Name="Licensing_Window_Start" Value="${fechaInicio}:00"/>
                  <App_Data App="${tipoContenido}" Name="Licensing_Window_End" Value="${fechaFin}:00"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title" Value="${tituloContenido}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Title_Brief" Value="${tituloContenido}"/>
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Short" Value="${descCorta}" />
                  <App_Data App="${tipoContenido}" Language="${idioma}" Name="Summary_Long" Value="${descLarga}" />
                </Metadata>   
              </Asset>             
            </ADI>`;
        break;

      default:
        break;
    }

    let blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
    let nombreArchivo = `${numeroContenido}.xml`;

    saveAs(blob, nombreArchivo);
  }
}

//FUNCIONES AUXILIARES

function CorregiridProvedor(idProveedor) {
  while (idProveedor.length <= 4) {
    idProveedor = "0" + idProveedor;
  }
  return idProveedor;
}

function CorregirnumeroContenido(numeroContenido) {
  while (numeroContenido.length <= 8) {
    numeroContenido = "0" + numeroContenido;
  }
  return numeroContenido;
}

function getFileName(file) {
  if (file) {
    let pos = file.lastIndexOf("\\");
    file = file.substring(pos + 1);
  }
  return file;
}

function getBillingID(idProveedor, nContenido) {
  let Billing_ID = idProveedor + nContenido.substring(4);
  return Billing_ID;
}

function getValueToXML(xml, name) {
  name = `Name="${name}"`;
  let returnValue;
  returnValue = xml.substring(xml.indexOf(name) + name.length);
  console.log(returnValue.indexOf('Value="'));
  returnValue = returnValue.substring(
    returnValue.indexOf('Value="') + 'Value="'.length
  );
  returnValue = returnValue.substring(0, returnValue.indexOf('"'));
  return returnValue;
}

function tieneSubtitulos() {
  let subtitulos = document.querySelector("#subtitulos").value;
  subtitulos = getFileName(subtitulos);
  return subtitulos;
}

function tieneTriler() {
  let trailer = document.querySelector("#trailer").value;
  trailer = getFileName(trailer);
  return trailer;
}

function tieneImagenTrailerVertical() {
  let imagenTrailerVertical = document.querySelector(
    "#imagenTrailerVertical"
  ).value;
  imagenTrailerVertical = getFileName(imagenTrailerVertical);
  return imagenTrailerVertical;
}

function tieneVideo() {
  let video = document.querySelector("#video").value;
  video = getFileName(video);
  return video;
}

/* function getKeyToXML(xml,key){
  let returnValue;
  returnValue = xml.substring(xml.indexOf(key) + key.length + 2);
  returnValue = returnValue.substring(0,returnValue.indexOf('"'));
  return returnValue;

} */
