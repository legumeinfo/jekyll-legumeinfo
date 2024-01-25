<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>LIS: Legume Information System</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A collaborative, community resource to facilitate crop improvement by integrating genetic, genomic, and trait data across legume species.">
  <meta name="robots" content="all">
  <meta name="author" content="">
  
  
  <link rel="canonical" href="/assets/js/graphql/query.js">

  
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-49655154-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-49655154-1');
</script>



  <!-- Custom CSS -->
  <link rel="stylesheet" href="/assets/uikit/dist/css/uikit.min.css" type="text/css" />
  <link rel="stylesheet" href="/assets/css/uikit-theme.css" type="text/css" />

  <!-- place globally-included stylesheet content here -->
<style>
  .species-image {
      float: right;
      margin: 10px;
  }
  .species-image img {
      border: 1px solid darkgreen;
  }
  .species-image .attribution {
      text-align: center; 
      font-style: italic;
      font-size: 80%;
  }
  .blog-image {
      float: right;
      margin: 10px;
  }
  .blog-image img {
      border: 1px solid gray;
  }
  .blog-image .attribution {
      text-align: center; 
      font-style: italic;
      font-size: 80%;
  }
  .temp {
      color: darkred;
      font-family: serif;
      font-weight: bold;
  }
</style>



  <!-- Custom JS -->
  <script src="/assets/uikit/dist/js/uikit.min.js"></script>
  <script src="/assets/uikit/dist/js/uikit-icons.min.js"></script>

  <!-- place globally-included scripts here -->


  <!-- opt-in code for integrating GraphQL with LIS Web Components -->
  <script type="importmap">
    {
      "imports": {
        "lis-graphql": "/assets/js/graphql/index.js"
      }
    }
  </script>

  

  <!-- Icons -->
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
      <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/favicon-192x192.png">
      <link rel="icon" href="/assets/icons/favicon.ico">
      </head>


<body>




<div id="navbar" class="uk-navbar-container tm-navbar-container uk-sticky uk-sticky-fixed uk-light" uk-sticky>

  <div id="alerts">
    
    
      

    
  </div>

  <script type="text/javascript">

    // define the cookie key
    const alertsKey = "lis-navbar-alerts";

    // get the alerts element
    const alerts = document.getElementById("alerts");

    // define a callback that saves the toggle state
    function toggleCallback(event) {
      document.cookie = `${alertsKey}=${event.type};SameSite=Lax;path=/`;
    }

    // use the callback every time the element is toggled
    alerts.addEventListener("show", toggleCallback);
    alerts.addEventListener("hide", toggleCallback);

    // load the element's state
    const alertsCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${alertsKey}=`));

    // hide the alerts if they're supposed to be hidden
    if (alertsCookie && alertsCookie.split('=')[1].toLowerCase() === "hide") {
      UIkit.toggle(alerts).toggle();
    }

  </script>

  <div class="uk-container uk-container-expand">
    <nav class="uk-navbar">
      <div class="uk-navbar-left uk-text-truncate">
        <a class="uk-navbar-item uk-logo uk-text-truncate" href="/">
          
          <img class="uk-margin-small-right" src="/assets/img/logo.png" width="47" height="47" />
          
          <div class="uk-text-truncate">
            LIS: Legume Information System
            
            <div class="uk-navbar-subtitle uk-text-truncate">Information about legume traits for crop improvement</div>
            
          </div>
        </a>
      </div>
      <div class="uk-navbar-right uk-flex-none">

        <ul class="uk-navbar-nav uk-visible@l">
  <li><a href="/">Home</a></li>
  <li>
    <a href="/taxa">Taxa</a>
    
    
    <div class="uk-navbar-dropdown uk-width-auto" uk-dropdown="delay-hide: 0;">
      <ul class="uk-nav uk-navbar-dropdown-nav">
      
        
          
            <li> <a href="/taxa//arachis"> Arachis (Peanut)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//cajanus"> Cajanus (Pigeonpea)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//cicer"> Cicer (Chickpea)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//glycine"> Glycine (Soybean)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//lotus"> Lotus (Bird's-foot trefoil)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//lupinus"> Lupinus (Lupin grain legumes)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//medicago"> Medicago (Alfalfa/Lucerne, Barrel Medic)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//phaseolus"> Phaseolus (Common Bean, Lima Bean, Tepary Bean, etc.)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//pisum"> Pisum (Pea)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//trifolium"> Trifolium (Clover)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//vigna"> Vigna (Cowpea)</a></li>
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
      <li><a href="/taxa">OTHERS (Many special-focus species and collections)</a></li>
      </ul>
    </div>
    
  </li>
  <li>
    <a href="/tools">Tools</a>
    
    
    <div class="uk-navbar-dropdown uk-width-auto" uk-dropdown="delay-hide: 0;">
      <ul class="uk-nav uk-navbar-dropdown-nav">
      
        
          <li><a href="https://data.legumeinfo.org/">LIS Datastore</a></li>
        
          <li><a href="https://mines.legumeinfo.org/">LIS InterMines</a></li>
        
          <li><a href="https://dscensor.legumeinfo.org/">DSCensor Data Overviews</a></li>
        
      
        
          <li><a href="/tools/search/gene.html">Gene Search Tool</a></li>
        
      
        
          <li><a href="https://sequenceserver.legumeinfo.org/">LIS SequenceServer BLAST</a></li>
        
          <li><a href="https://funnotate.legumeinfo.org/">Funnotate: Annotate Your Sequences</a></li>
        
      
        
          <li><a href="https://gcv.legumeinfo.org/">Genome Context Viewer</a></li>
        
          <li><a href="https://zzbrowse.legumeinfo.org/">ZZBrowse GWAS/QTL</a></li>
        
          <li><a href="https://cmap.legumeinfo.org/">CMap: Genetic Map Viewer</a></li>
        
          <li><a href="https://germplasm-map.legumeinfo.org/">LIS Germplasm GIS Viewer</a></li>
        
          <li><a href="https://conekt.legumeinfo.org/species">Conekt Comparative Expression</a></li>
        
          <li><a href="https://funnotate.legumeinfo.org/?search">Gene Family Search</a></li>
        
          <li><a href="/tools/gcvit">GCViT: SNP Comparison Tool</a></li>
        
      
      </ul>
    </div>
    
  </li>
  <li><a href="/download">Download</a></li>
  <li><a href="/community">Community</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>

<a href="#off-screen-menu" class="uk-navbar-toggle uk-hidden@s" uk-navbar-toggle-icon uk-toggle></a>


        <ul class="uk-navbar-nav uk-visible@s">

        
          <li><a class="tm-no-underline" href="https://twitter.com/legumeinfo" target="_blank" title="Follow us on Twitter"><span uk-icon="twitter"></span></a></li>
        
        
        
          <li><a class="tm-no-underline" href="https://github.com/legumeinfo" target="_blank" title="Fork us on GitHub"><span uk-icon="github"></span></a></li>
        

        </ul>
        
        
      </div>
    </nav>
    <nav class="uk-navbar tm-lower-navbar">
      <div class="uk-navbar-left">

        <ul class="uk-navbar-nav uk-hidden@l uk-visible@s">
  <li><a href="/">Home</a></li>
  <li>
    <a href="/taxa">Taxa</a>
    
    
    <div class="uk-navbar-dropdown uk-width-auto" uk-dropdown="delay-hide: 0;">
      <ul class="uk-nav uk-navbar-dropdown-nav">
      
        
          
            <li> <a href="/taxa//arachis"> Arachis (Peanut)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//cajanus"> Cajanus (Pigeonpea)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//cicer"> Cicer (Chickpea)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//glycine"> Glycine (Soybean)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//lotus"> Lotus (Bird's-foot trefoil)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//lupinus"> Lupinus (Lupin grain legumes)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//medicago"> Medicago (Alfalfa/Lucerne, Barrel Medic)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//phaseolus"> Phaseolus (Common Bean, Lima Bean, Tepary Bean, etc.)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//pisum"> Pisum (Pea)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//trifolium"> Trifolium (Clover)</a></li>
          
        
      
        
          
            <li> <a href="/taxa//vigna"> Vigna (Cowpea)</a></li>
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
      <li><a href="/taxa">OTHERS (Many special-focus species and collections)</a></li>
      </ul>
    </div>
    
  </li>
  <li>
    <a href="/tools">Tools</a>
    
    
    <div class="uk-navbar-dropdown uk-width-auto" uk-dropdown="delay-hide: 0;">
      <ul class="uk-nav uk-navbar-dropdown-nav">
      
        
          <li><a href="https://data.legumeinfo.org/">LIS Datastore</a></li>
        
          <li><a href="https://mines.legumeinfo.org/">LIS InterMines</a></li>
        
          <li><a href="https://dscensor.legumeinfo.org/">DSCensor Data Overviews</a></li>
        
      
        
          <li><a href="/tools/search/gene.html">Gene Search Tool</a></li>
        
      
        
          <li><a href="https://sequenceserver.legumeinfo.org/">LIS SequenceServer BLAST</a></li>
        
          <li><a href="https://funnotate.legumeinfo.org/">Funnotate: Annotate Your Sequences</a></li>
        
      
        
          <li><a href="https://gcv.legumeinfo.org/">Genome Context Viewer</a></li>
        
          <li><a href="https://zzbrowse.legumeinfo.org/">ZZBrowse GWAS/QTL</a></li>
        
          <li><a href="https://cmap.legumeinfo.org/">CMap: Genetic Map Viewer</a></li>
        
          <li><a href="https://germplasm-map.legumeinfo.org/">LIS Germplasm GIS Viewer</a></li>
        
          <li><a href="https://conekt.legumeinfo.org/species">Conekt Comparative Expression</a></li>
        
          <li><a href="https://funnotate.legumeinfo.org/?search">Gene Family Search</a></li>
        
          <li><a href="/tools/gcvit">GCViT: SNP Comparison Tool</a></li>
        
      
      </ul>
    </div>
    
  </li>
  <li><a href="/download">Download</a></li>
  <li><a href="/community">Community</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>


      </div>
    </nav>
  </div>
</div>

<div id="off-screen-menu" uk-offcanvas="overlay: true">
  <div class="uk-offcanvas-bar uk-dark  uk-background-secondary">

    <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
  <li><a href="/">Home</a></li>
  
  <li class="uk-parent">
    <a href="#">Taxa</a>
    
    <ul class="uk-nav-sub">
      
        
          
            <li><a href="/taxa//arachis"> Arachis (Peanut)</a></li>
          
        
      
        
          
            <li><a href="/taxa//cajanus"> Cajanus (Pigeonpea)</a></li>
          
        
      
        
          
            <li><a href="/taxa//cicer"> Cicer (Chickpea)</a></li>
          
        
      
        
          
            <li><a href="/taxa//glycine"> Glycine (Soybean)</a></li>
          
        
      
        
          
            <li><a href="/taxa//lotus"> Lotus (Bird's-foot trefoil)</a></li>
          
        
      
        
          
            <li><a href="/taxa//lupinus"> Lupinus (Lupin grain legumes)</a></li>
          
        
      
        
          
            <li><a href="/taxa//medicago"> Medicago (Alfalfa/Lucerne, Barrel Medic)</a></li>
          
        
      
        
          
            <li><a href="/taxa//phaseolus"> Phaseolus (Common Bean, Lima Bean, Tepary Bean, etc.)</a></li>
          
        
      
        
          
            <li><a href="/taxa//pisum"> Pisum (Pea)</a></li>
          
        
      
        
          
            <li><a href="/taxa//trifolium"> Trifolium (Clover)</a></li>
          
        
      
        
          
            <li><a href="/taxa//vigna"> Vigna (Cowpea)</a></li>
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
        
          
        
      
      <li><a href="/taxa">OTHERS (Many special-focus species and collections)</a></li>
    </ul>
  </li>
  
  
  <li class="uk-parent">
    <a href="/tools">Tools</a>
    
    <ul class="uk-nav-sub">
      
        
          <li><a href="https://data.legumeinfo.org/">LIS Datastore</a></li>
        
          <li><a href="https://mines.legumeinfo.org/">LIS InterMines</a></li>
        
          <li><a href="https://dscensor.legumeinfo.org/">DSCensor Data Overviews</a></li>
        
      
        
          <li><a href="/tools/search/gene.html">Gene Search Tool</a></li>
        
      
        
          <li><a href="https://sequenceserver.legumeinfo.org/">LIS SequenceServer BLAST</a></li>
        
          <li><a href="https://funnotate.legumeinfo.org/">Funnotate: Annotate Your Sequences</a></li>
        
      
        
          <li><a href="https://gcv.legumeinfo.org/">Genome Context Viewer</a></li>
        
          <li><a href="https://zzbrowse.legumeinfo.org/">ZZBrowse GWAS/QTL</a></li>
        
          <li><a href="https://cmap.legumeinfo.org/">CMap: Genetic Map Viewer</a></li>
        
          <li><a href="https://germplasm-map.legumeinfo.org/">LIS Germplasm GIS Viewer</a></li>
        
          <li><a href="https://conekt.legumeinfo.org/species">Conekt Comparative Expression</a></li>
        
          <li><a href="https://funnotate.legumeinfo.org/?search">Gene Family Search</a></li>
        
          <li><a href="/tools/gcvit">GCViT: SNP Comparison Tool</a></li>
        
      
    </ul>
  </li>
  
  <li><a href="/download">Download</a></li>
  <li><a href="/community">Community</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>


    
    <ul class="uk-nav uk-nav-default">
      <li class="uk-nav-divider"></li>
      
      <li><a href="https://twitter.com/legumeinfo" target="_blank" title="Follow us on Twitter"><span uk-icon="twitter"></span> Twitter</a></li>
      
      
      
      <li><a href="https://github.com/legumeinfo" target="_blank" title="Fork us on GitHub"><span uk-icon="github"></span> GitHub</a></li>
      
    </ul>
    

  </div>
</div>



<!-- NOTE: putting content between the tools and tm-main blocks will break CSS selectors -->
<div class="tm-main uk-section uk-section-default uk-flex">
  <div class="uk-container uk-width-1-1">
    /** The URI of the GraphQL server to query. */
const uri = "https://graphql.lis.ncgr.org/";


/**
 * Gets data from a GraphQL server via a POST request.
 * Adapted from https://graphql.org/graphql-js/graphql-clients/
 * @param {string} query - The GraphQL query.
 * @param {object} variables - The variables for the GraphQL query.
 * @returns {Promise<Response>} A `Promise` that resolves to a `Response` object.
 */
export function query(query, variables={}, abortSignal=undefined) {
    return fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        signal: abortSignal,
    })
    .then(r => r.json())
    .then((response) => {
      if (response.errors) {
        response.errors.forEach(console.error);
      }
      return response;
    });
}

  </div>

  

</div>


</body>
</html>
