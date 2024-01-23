let autoFireButton = null;
let listEventEl = null;
let autoFireSelect = null;
let autoSelected = 'All';

const events = {
  "Home": {
    "path": "/",
    "events": [ 
      {"event": "CTA Clicked", "props": {"CTA": "Get started link clicked", "action": "Get started link clicked from home page"}},
      {"event": "UI Interaction", "props": {"CTA": "Canvas view link clicked", "action": "Canvas view link clicked from home page"}},
      {"event": "Created Object", "props": {"action": "Register application link clicked", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register environment link clicked", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register cloud link clicked", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register application link clicked", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create policy link clicked", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register location link clicked", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Map view link clicked", "action": "Map view link clicked from home page"}}
    ]  
  },
  "Admin Dropdown": {
    "path": "/admin",
    "events": [ 
      {"event": "Read Object", "props": {"action": "Resource group open", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "API key open", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Secrets open", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Identities open", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Roles open", "objectType": "button"}}
    ] 
  },  
  "Admin Resource Groups": {
    "path": "/admin",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Create resource group modal", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create resource group", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Edit resource group", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "View resource group", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Delete resource group", "objectType": "button"}}
    ]
  },
  "Admin API Keys": {
    "path": "/admin",
    "events": [ 
      {"event": "Read Object", "props": {"action": "View API key", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Edit API key", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "create API key", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Generate API key", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete API key", "objectType": "button"}}
    ]
  },
  "Admin Secrets": {
    "path": "/admin",
    "events": [ 
      {"event": "Read Object", "props": {"action": "View secret", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register secret modal", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register secret", "objectType": "button"}},
      {"event": "Updated Object", "props": {"action": "Edit secret", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete secret", "objectType": "button"}}
    ]
  },  
  "Admin Identities": {
    "path": "/admin",
    "events": [ 
      {"event": "Read Object", "props": {"action": "View identities", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create identity modal", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create identity", "objectType": "button"}},
      {"event": "Updated Object", "props": {"action": "Edit identity", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete identity", "objectType": "button"}}
    ]
  },  
  "Admin Roles": {
    "path": "/admin",
    "events": [ 
      {"event": "Read Object", "props": {"action": "View role", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create role modal", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create role", "objectType": "button"}},
      {"event": "Updated Object", "props": {"action": "Edit role", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete role", "objectType": "button"}}
    ]
  },  
  "Side Navigation": {
    "path": "/admin",
    "events": [ 
      {"event": "UI Interaction", "props": {"CTA": "Applications & Services nav clicked", "action": "Open applications and services"}},
      {"event": "UI Interaction", "props": {"CTA": "Environments nav clicked", "action": "Open deployment environments"}},
      {"event": "UI Interaction", "props": {"CTA": "Policies nav clicked", "action": "Open policies"}},
      {"event": "UI Interaction", "props": {"CTA": "Topology nav clicked", "action": "Open topology"}},
      {"event": "UI Interaction", "props": {"CTA": "Locations nav clicked", "action": "Open locations"}},
      {"event": "UI Interaction", "props": {"CTA": "Clouds nav clicked", "action": "Open clouds"}},
      {"event": "UI Interaction", "props": {"CTA": "Gateways nav clicked", "action": "Open gateways"}},
      {"event": "UI Interaction", "props": {"CTA": "Events nav clicked", "action": "Open events"}}
    ]
  },  
  "Cloud": {
    "path": "/cloud",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Register cloud", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register cloud clicked", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Next clicked", "action": "Next button clicked after cloud selected"}},
      {"event": "UI Interaction", "props": {"CTA": "Autodiscover on", "action": "Autodiscover switch to on from register cloud"}}
    ]
  },  
  "Cloud Details": {
    "path": "/cloudDetails",
    "events": [ 
      {"event": "Updated Object", "props": {"action": "Edit icon", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Location details", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Manage cloud location", "action": "Manage cloud location switched on from cloudDetails page"}},
      {"event": "UI Interaction", "props": {"CTA": "Manage cloud environments vpc", "action": "Manage cloud environment vpc switched on from cloudDetails page"}},
      {"event": "Created Object", "props": {"action": "Register deployment environment vpc", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Manage cloud environment cluster", "action": "Manage cloud environment cluster switched on from cloudDetails page"}},
      {"event": "UI Interaction", "props": {"CTA": "Autodiscover namespace cluster", "action": "Autodicover namespace cluster switched on from cloudDetails page"}},
      {"event": "Created Object", "props": {"action": "Register deployment environment cluster", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Deployment environment details", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Cloud location", "action": "Cloud location link clicked from cloudDetails page"}},
      {"event": "UI Interaction", "props": {"CTA": "Manage autodiscover namespace cluster", "action": "Manage autodiscover namespace cluster switched on from deployment environment configuration modal"}},
      {"event": "CommonMilestone", "props": {"commonMilestoneName": "Manage autodiscover namespace cluster", "action": "Manage autodiscover namespace cluster milestone"}},
      {"event": "Created Object", "props": {"action": "Connect a gateway cluster", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Gateway installation method", "action": "Gateway installation method radio button selected from connect edge gateway modal"}},
      {"event": "Created Object", "props": {"action": "Deploy edge gateway", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register edge gateway", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete a cloud", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Namespace details click", "action": "Namespace details link clicked from cloudDetails page"}}
    ]
  },  
  "Locations": {
    "path": "/locations",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Register location", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register location modal", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Location type selected", "action": "Type selected from register location modal"}}
    ]
  },  
  "Locations Details": {
    "path": "/cloud/locationDetails",
    "events": [ 
      {"event": "UI Interaction", "props": {"CTA": "Managed deployment environment", "action": "Managed deployment environment link clicked from locationDetails page"}},
      {"event": "Created Object", "props": {"action": "Register deployment environment from location", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register deployment environment from cloud", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Deleting location", "objectType": "button"}}
    ]
  },  
  "Deployment Environment": {
    "path": "/deploymentenvironments",
    "events": [ 
      {"event": "UI Interaction", "props": {"CTA": "Register deployment environment", "action": "Register environment button clicked from deployment environments"}},
      {"event": "Created Object", "props": {"action": "Register deployment environment model", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Autodiscover namespace on", "action": "Autodiscover namespace switch on from register deployment environment"}}
    ]
  },  
  "Deployment Environment Details": {
    "path": "/deploymentEnvironmentDetails",
    "events": [ 
      {"event": "Updated Object", "props": {"action": "Edit deployment environment details", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register namespace", "objectType": "button"}},
      {"event": "CommonMilestone", "props": {"commonMilestoneName": "Register namespace", "action": "Register namespace milestone"}},
      {"event": "UI Interaction", "props": {"CTA": "Autodiscover namespace applications", "action": "Autodiscover applications in the namespace"}},
      {"event": "Updated Object", "props": {"action": "Save changes to the namespace", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete deployment environment", "objectType": "button"}}
    ]
  },  
  "Applications": {
    "path": "/applications",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Register application", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register application modal", "objectType": "button"}}
    ]
  },  
  "Application Details": {
    "path": "/applicationDetails",
    "events": [ 
      {"event": "Updated Object", "props": {"action": "Edit application details", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register service", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register service modal", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register deployment", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register application deployment modal", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Deployment instance selected", "action": "Deployment instance link clicked from applicationDetails page"}},
      {"event": "Deleted Object", "props": {"action": "Deleting service", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Deleting application", "objectType": "button"}}
    ]
  },  
  "Application Deployment Details": {
    "path": "/applicationDeploymentDetails",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Register instance", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register service", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Register service endpoint", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Deleting application instance", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Deleting service endpoint", "objectType": "button"}}
    ]
  },  
  "Policies": {
    "path": "/connectionAccessPolicies",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Create policy", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create Policy modal", "objectType": "button"}},
      {"event": "CommonMilestone", "props": {"commonMilestoneName": "Create Policy modal", "action": "Create Policy model milestone"}},
      {"event": "Read Object", "props": {"action": "Open policy", "objectType": "button"}}
    ]
  },  
  "Policy Details": {
    "path": "/connectionaccesspolicydetails",
    "events": [ 
      {"event": "Updated Object", "props": {"action": "Edit policy details", "objectType": "button"}},
      {"event": "Updated Object", "props": {"action": "Edit Policy connection", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete policy", "objectType": "button"}}
    ]
  },  
  "Topology": {
    "path": "/topologies",
    "events": [ 
      {"event": "Updated Object", "props": {"action": "Search", "objectType": "button"}},
      {"event": "UI Interaction", "props": {"CTA": "Canvas view", "action": "Clicked on the canvas view in topology"}},
      {"event": "UI Interaction", "props": {"CTA": "Map view", "action": "Clicked on the map view in topology"}},
      {"event": "UI Interaction", "props": {"CTA": "View filter", "action": "Clicked on the view filter in topology"}},
      {"event": "UI Interaction", "props": {"CTA": "Expand to", "action": "Clicked on the expand to in topology"}},
      {"event": "UI Interaction", "props": {"CTA": "Open Metrics", "action": "Open the metrics panel"}}
    ]
  },  
  "Events": {
    "path": "/event",
    "events": [ 
      {"event": "Read Object", "props": {"action": "Open event", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Assign event", "objectType": "button"}}
    ]
  },  
  "Event Details": {
    "path": "/eventDetails",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Comment on event", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Deleting event", "objectType": "button"}}
    ]
  },  
  "Gateways": {
    "path": "/gateways",
    "events": [ 
      {"event": "Created Object", "props": {"action": "Create gateway modal", "objectType": "button"}},
      {"event": "Read Object", "props": {"action": "Open gateway details", "objectType": "button"}},
      {"event": "Created Object", "props": {"action": "Create gateway", "objectType": "button"}}
    ]
  },  
  "Gateway Details": {
    "path": "/gatewayDetails",
    "events": [ 
      {"event": "Updated Object", "props": {"action": "Edit gateway", "objectType": "button"}},
      {"event": "Deleted Object", "props": {"action": "Delete gateway", "objectType": "button"}}
    ]
  },  
  "Login & Logout": {
    "path": "",
    "events": [ 
      {"event": "Service Login", "props": {"action": "User login", "objectType": "button"}},
      {"event": "Service Logout", "props": {"action": "User logout", "objectType": "button"}}
    ]
  }
}
let segment = {
  init: () => {
    listEventEl = document.querySelector('.event-list')
    autoFireButton = document.querySelector('.auto-fire-button')
    autoFireButton.addEventListener('click', () => {
      segment.automate()
    })
    autoFireSelect = document.querySelector('.auto-fire-select')
    segment.addOption('All', 'All')
    Object.keys(events).forEach((key) => {
      segment.addOption(key, key)
    })
    autoFireSelect.addEventListener('change', (evt) => {
      console.log(autoFireSelect.value)
      autoSelected = autoFireSelect.value;
    })
    //window._analytics.commonProperties = { productCode: 'WW1314', productCodyType: 'WWPC' }
  },
  addOption: (name, value) => {
    let opt = document.createElement('option')
    opt.text = name
    opt.value = value
    autoFireSelect.append(opt)
  },
  setDDO: (title, category) => {
    window.digitalData = {
      page: {
        pageInfo: {
          productTitle: title,
          analytics: {
              category: category
          }
        }
      }
    }
  },
  track: (event, props) => {
    analytics.track(event, props);
  },
  page: (name, props) => {
    analytics.page(name, props);
  },
  automate: () => {
    listEventEl.innerHTML = '';
    var child = listEventEl.lastElementChild;  
    while (child) { 
      listEventEl.removeChild(child); 
      child = listEventEl.lastElementChild; 
    } 
    let div;
    let props;
    let evtKeys = Object.keys(events);
    for(let i=0; i<evtKeys.length; i++) {
      if(evtKeys[i] == autoSelected || autoSelected == 'All') {
        setTimeout(() => {
          console.log(evtKeys[i])
          segment.setDDO('Hybrid Cloud Mesh', evtKeys[i])
          segment.page(evtKeys[i], {title: 'Hybrid Cloud Mesh', path: events[evtKeys[i]].path, productCode: 'WW1314', productCodeType: 'WWPC'})
          //analytics.page('Home', {title: 'Hybrid Cloud Mesh', path: '/topologies'});
          div = document.createElement('div')
          div.innerHTML = evtKeys[i]
          listEventEl.append(div)
          let evts = events[evtKeys[i]]['events'];
          for(let m=0; m<evts.length; m++) {
            setTimeout(() => {
              console.log(evts[m])
              props = {productCode: 'WW1314', productCodeType: 'WWPC', UT30: '30ASC', productTitle: 'IBM Hybrid Cloud Mesh'};
              props['instanceId'] = 'ccrf3jkf0uv4vo3401a0';
              props = Object.assign(props, evts[m].props);
              props['action'] = `${evtKeys[i]}, ${props['action']}`
              segment.track(evts[m].event, props)
              div = document.createElement('div')
              div.innerHTML = JSON.stringify(evts[m])
              listEventEl.append(div)  
            }, autoSelected == 'All' ? 5000*(m+1)+800 : (m+1)*3000)+800
          }
        }, autoSelected == 'All' ? (i+1)*3000+300 : 300)
      }


      //div = document.createElement('div')
      //div.innerHTML = evtKeys[i]
      //listEventEl.append(div)
      //let cats = Object.keys(events[evtKeys[i]])
      //for(let k=0; k<cats.length; k++) {
      //  if(cats[k] == autoSelected || autoSelected == 'All') {
      //    setTimeout(() => {
      //      console.log(cats[k])
      //      segment.setDDO('Hybrid Cloud Mesh', cats[k])
      //      segment.page(cats[k], {title: 'Hybrid Cloud Mesh', path: events[evtKeys[i]][cats[k]].path, productCode: 'WW1314', productCodeType: 'WWPC'})
      //      //analytics.page('Home', {title: 'Hybrid Cloud Mesh', path: '/topologies'});
      //      div = document.createElement('div')
      //      div.innerHTML = cats[k]
      //      listEventEl.append(div)
      //      let evts = events[evtKeys[i]][cats[k]]['events'];
      //      for(let m=0; m<evts.length; m++) {
      //        setTimeout(() => {
      //          console.log(evts[m])
      //          props = {productCode: 'WW1314', productCodeType: 'WWPC', UT30: '30ASC', productTitle: 'IBM Hybrid Cloud Mesh'};
      //          props['instanceId'] = 'ccrf3jkf0uv4vo3401a0';
      //          props = Object.assign(props, evts[m].props);
      //          segment.track(evts[m].event, props)
      //          div = document.createElement('div')
      //          div.innerHTML = JSON.stringify(evts[m])
      //          listEventEl.append(div)  
      //        }, autoSelected == 'All' ? 5000*(m+1)+800 : (m+1)*3000)+800
      //      }
      //    }, autoSelected == 'All' ? (k+1)*3000+300 : 300)
      //  }
      //}
    }
    //Object.keys(events).forEach((key) => {
    //  div = document.createElement('div')
    //  div.innerHTML = key
    //  listEventEl.append(div)
    //  Object.keys(events[key]).forEach((cat, eindex) => {
    //    if(cat == autoSelected || autoSelected == 'All') {
    //      setTimeout(() => {
    //        console.log(cat)
    //        segment.setDDO('Hybrid Cloud Mesh', cat)
    //        segment.page(cat, {title: 'Hybrid Cloud Mesh', path: events[key][cat].path, productCode: 'WW1314', productCodeType: 'WWPC'})
    //        //analytics.page('Home', {title: 'Hybrid Cloud Mesh', path: '/topologies'});
    //        div = document.createElement('div')
    //        div.innerHTML = cat
    //        listEventEl.append(div)
    //        let evts = events[key][cat]['events'];
    //        evts.forEach((e, idx) => {
    //          setTimeout(() => {
    //            console.log(e)
    //            props = {productCode: 'WW1314', productCodeType: 'WWPC'};
    //            props[cat] = e.value;
    //            props['action'] = e.action;
    //            segment.track(key, props)
    //            //if(idx == 0) {
    //            //  segment.track(key, props)
    //            //}
    //            div = document.createElement('div')
    //            div.innerHTML = JSON.stringify(e)
    //            listEventEl.append(div)  
    //          }, autoSelected == 'All' ? idx*3000*(eindex+1) : idx*3000)
    //        })    
    //      }, autoSelected == 'All' ? eindex*3000 : 3000)
    //    }
    //  })
    //})
  }
}