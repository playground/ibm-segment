let autoFireButton = null;
let listEventEl = null;

const events = {
  "Product CTA Clicked": {
    "Home": {
      "path": '/',
      "events": [ 
        {"value": "Get started link clicked", "action": "Get started link clicked from home page"},
        {"value": "Canvas view link clicked", "action": "Canvas view link clicked from home page"},
        {"value": "Register application link clicked", "action": "Register application link clicked from home page"},
        {"value": "Register environment link clicked", "action": "Register environment link clicked from home page"},
        {"value": "Register cloud link clicked", "action": "Register cloud link clicked from home page"},
        {"value": "Register application link clicked", "action": "Register application link clicked from home page"},
        {"value": "Map view link clicked", "action": "Map view link clicked from home page"},
        {"value": "Create policy link clicked", "action": "Create policy link clicked from home page"},
        {"value": "Register location link clicked", "action": "Register location link clicked from home page"}
      ]  
    },
    "AdminDropdown": {
      "path": "/admin",
      "events": [ 
        {"value": "Resource group open", "action": "Open the resource group page"},
        {"value": "API key open", "action": "Open the API key page"},
        {"value": "Secrets open", "action": "Open the secrets page"},
        {"value": "Identities open", "action": "Open the identities page"},
        {"value": "Roles open", "action": "Open the roles page"}
      ] 
    },  
    "AdminResourceGroups": {
      "path": "/admin",
      "events": [ 
        {"value": "Create resource group modal", "action": "Open create a resource group modal"},
        {"value": "Create resource group", "action": "Finish create resource group flow"},
        {"value": "Edit resource group", "action": "Edit a resource group"},
        {"value": "View resource groupn", "action": "View a resource group details"},
        {"value": "Delete resource group", "action": "Deleting a resource group"}
      ]
    },  
    "AdminAPIKeys": {
      "path": "/admin",
      "events": [ 
        {"value": "View API key", "action": "View an API key details"},
        {"value": "Edit API key", "action": "Edit an API key"},
        {"value": "create API key", "action": "Launch create API key modal"},
        {"value": "Generate API key", "action": "Finish creating API key flow"},
        {"value": "Delete API key", "action": "Deleting an API key"}
      ]
    },
    "AdminSecrets": {
      "path": "/admin",
      "events": [ 
        {"value": "View secret", "action": "View secret details"},
        {"value": "Register secret modal", "action": "Launch the egister secret modal"},
        {"value": "Register secret", "action": "Finish the register secret flow"},
        {"value": "Edit secret", "action": "Edit a secret"},
        {"value": "Delete secret", "action": "Deleting secret"}
      ]
    },  
    "AdminIdentities": {
      "path": "/admin",
      "events": [ 
        {"value": "View identities", "action": "View identity details"},
        {"value": "Create identity modal", "action": "Launch create identity modal"},
        {"value": "Create identity", "action": "Finish create identity flow"},
        {"value": "Edit identity", "action": "Edit an identity"},
        {"value": "Delete identity", "action": "Deleting identity"}
      ]
    },  
    "AdminRoles": {
      "path": "/admin",
      "events": [ 
        {"value": "View role", "action": "View role details"},
        {"value": "Create role modal", "action": "Launch create role modal"},
        {"value": "Create role", "action": "Finish create role flow"},
        {"value": "Edit role", "action": "Edit a role"},
        {"value": "Delete role", "action": "Deleting role"}
      ]
    },  
    "SideNavigation": {
      "path": "/admin",
      "events": [ 
        {"value": "Applications & Services nav clicked", "action": "Open applications and services"},
        {"value": "Environments nav clicked", "action": "Open deployment environments"},
        {"value": "Policies nav clicked", "action": "Open policies"},
        {"value": "Topology nav clicked", "action": "Open topology"},
        {"value": "Locations nav clicked", "action": "Open locations"},
        {"value": "Clouds nav clicked", "action": "Open clouds"},
        {"value": "Gateways nav clicked", "action": "Open gateways"},
        {"value": "Events nav clicked", "action": "Open events"}
      ]
    },  
    "Cloud": {
      "path": "/cloud",
      "events": [ 
        {"value": "Register cloud clicked", "action": "Register button clicked after cloud selected"},
        {"value": "Next clicked", "action": "Next button clicked after cloud selected"},
        {"value": "Autodiscover on", "action": "Autodiscover switch to on from register cloud"}
      ]
    },  
    "CloudDetails": {
      "path": "/cloudDetails",
      "events": [ 
        {"value": "Edit icon", "action": "Edit icon clicked from cloudDetails page"},
        {"value": "Location details", "action": "Location details link clicked from cloudDetails page"},
        {"value": "Manage cloud location", "action": "Manage cloud location switched on from cloudDetails page"},
        {"value": "Manage cloud environments vpc", "action": "Manage cloud environment vpc switched on from cloudDetails page"},
        {"value": "Register deployment environment vpc", "action": "Register deployment environment vpc button clicked from cloudDetails page"},
        {"value": "Manage cloud environment cluster", "action": "Manage cloud environment cluster switched on from cloudDetails page"},
        {"value": "Autodiscover namespace cluster", "action": "Autodicover namespace cluster switched on from cloudDetails page"},
        {"value": "Register deployment environment cluster", "action": "Register deployment environment cluster button clicked from cloudDetails page"},
        {"value": "Deployment environment details", "action": "Deployment environment details link clicked from cloudDetails page"},
        {"value": "Cloud location", "action": "Cloud location link clicked from cloudDetails page"},
        {"value": "Manage autodiscover namespace cluster", "action": "Manage autodiscover namespace cluster switched on from deployment environment configuration modal"},
        {"value": "Connect a gateway cluster", "action": "Connect a gateway cluster button clicked from deployment environment configuration modal"},
        {"value": "Gateway installation method", "action": "Gateway installation method radio button selected from connect edge gateway modal"},
        {"value": "Deploy edge gateway", "action": "Deploy edge gateway button clicked from connect edge gateway modal"},
        {"value": "Register edge gateway", "action": "Register edge gateway button clicked from deployment environment configuration modal"},
        {"value": "Delete a cloud", "action": "Deleting a cloud"}
      ]
    },  
    "Locations": {
      "path": "/locations",
      "events": [ 
        {"value": "Register location", "action": "Register location button clicked from locations page"},
        {"value": "Register location model", "action": "Register location button clicked from register location modal"},
        {"value": "Location type selected", "action": "Type selected from register location modal"}
      ]
    },  
    "LocationsDetails": {
      "path": "/cloud/locationDetails",
      "events": [ 
        {"value": "Managed deployment environment", "action": "Managed deployment environment link clicked from locationDetails page"},
        {"value": "Register deployment environment from location", "action": "Register deployment environment link clicked from locationDetails page"},
        {"value": "Register deployment environment from cloud", "action": "Register deployment environment link clicked from cloudDetails page"},
        {"value": "Deleting location", "action": "Deleting a location"}
      ]
    },  
    "DeploymentEnvironment": {
      "path": "/deploymentenvironments",
      "events": [ 
        {"value": "Register deployment environment", "action": "Register environment button clicked from deployment environments"},
        {"value": "Register deployment environment model", "action": "Register deployment environment button clicked from register deployment environment modal"},
        {"value": "Autodiscover namespace on", "action": "Autodiscover namespace switch on from register deployment environment"}
      ]
    },  
    "DeploymentEnvironmentDetails": {
      "path": "/deploymentEnvironmentDetails",
      "events": [ 
        {"value": "Edit deployment environment details", "action": "Edit deployment environment details"},
        {"value": "Register namespace", "action": "Register a namespace"},
        {"value": "Autodiscover namespace applications", "action": "Autodiscover applications in the namespace"},
        {"value": "Save changes to the namespace", "action": "Save the changes to the namespace modal"},
        {"value": "Delete deployment environment", "action": "Deleting a deployment environment"}
      ]
    },  
    "Applications": {
      "path": "/applications",
      "events": [ 
        {"value": "Register application", "action": "Register application button clicked from applications page"},
        {"value": "Register application modal", "action": "Register button clicked from register application modal"}
      ]
    },  
    "ApplicationDetails": {
      "path": "/applicationDetails",
      "events": [ 
        {"value": "Edit application details", "action": "Edit the details of an application"},
        {"value": "Register service", "action": "Register service link clicked from applicationDetails page"},
        {"value": "Register service modal", "action": "Register service button clicked from register service modal"},
        {"value": "Register deployment", "action": "Register deployment button clicked from applications page"},
        {"value": "Register application deployment modal", "action": "Register button clicked from register applications deployment modal"},
        {"value": "Deployment instance selected", "action": "Deployment instance link clicked from applicationDetails page"},
        {"value": "Deleting service", "action": "Deleting a service"},
        {"value": "Deleting application", "action": "Deleting an application"}
      ]
    },  
    "ApplicationDeploymentDetails": {
      "path": "/applicationDeploymentDetails",
      "events": [ 
        {"value": "Register instance", "action": "Register instance button clicked from application deployment details page"},
        {"value": "Register service", "action": "Register service endpoint link clicked from application deployment details page"},
        {"value": "Register service endpoint", "action": "Register service endpoint button clicked from application deployment details page"},
        {"value": "Deleting application instance", "action": "Deleting an application instance"},
        {"value": "Deleting service endpoint", "action": "Deleting a service endpoint"}
      ]
    },  
    "Policies": {
      "path": "/connectionAccessPolicies",
      "events": [ 
        {"value": "Create policy", "action": "Create Policy button clicked from connectionAccessPolicies"},
        {"value": "Create Policy modal", "action": "Create Policy modal"},
        {"value": "Open policy", "action": "Open a policy to see its details"}
      ]
    },  
    "PolicyDetails": {
      "path": "/connectionaccesspolicydetails",
      "events": [ 
        {"value": "Edit policy details", "action": "Edit the details of the policy"},
        {"value": "Edit Policy connection", "action": "Edit the connections of the policy"},
        {"value": "Delete policy", "action": "Deleting a policy"}
      ]
    },  
    "Topology": {
      "path": "/topologies",
      "events": [ 
        {"value": "Search", "action": "Clicked on the search bar in topology"},
        {"value": "Canvas view", "action": "Clicked on the canvas view in topology"},
        {"value": "Map view", "action": "Clicked on the map view in topology"},
        {"value": "View filter", "action": "Clicked on the view filter in topology"},
        {"value": "Expand to", "action": "Clicked on the expand to in topology"}
      ]
    },  
    "Events": {
      "path": "/event",
      "events": [ 
        {"value": "Open event", "action": "View the details of an event"},
        {"value": "Assign event", "action": "Assign event flow triggered"}
      ]
    },  
    "EventDetails": {
      "path": "/eventDetails",
      "events": [ 
        {"value": "Comment on event", "action": "Comment on an event"},
        {"value": "Deleting event", "action": "Deleting an event"}
      ]
    },  
    "Gateways": {
      "path": "/gateways",
      "events": [ 
        {"value": "Create gateway modal", "action": "Launch create gateway modal"},
        {"value": "Open gateway details", "action": "View the gateway details"},
        {"value": "Create gateway", "action": "Finish the create gateway flow"}
      ]
    },  
    "GatewayDetails": {
      "path": "/gatewayDetails",
      "events": [ 
        {"value": "Edit gateway", "action": "Edit the gateway details"},
        {"value": "Delete gateway", "action": "Deleting a gateway"}
      ]
    }  
  }
}
let segment = {
  init: () => {
    listEventEl = document.querySelector('.event-list')
    autoFireButton = document.querySelector('.auto-fire-button')
    autoFireButton.addEventListener('click', () => {
      segment.automate()
    })
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
    let div;
    let props;
    Object.keys(events).forEach((key) => {
      div = document.createElement('div')
      div.innerHTML = key
      listEventEl.append(div)
      Object.keys(events[key]).forEach((cat, idx) => {
        console.log(cat)
        segment.setDDO('Hybrid Cloud Mesh', cat)
        segment.page(cat, {title: 'Hybrid Cloud Mesh', path: events[key][cat].path})
        //analytics.page('Home', {title: 'Hybrid Cloud Mesh', path: '/topologies'});
        div = document.createElement('div')
        div.innerHTML = cat
        listEventEl.append(div)
        let evts = events[key][cat]['events'];
        evts.forEach((e, idx) => {
          console.log(e)
          props = {};
          props[cat] = e.value;
          props['action'] = e.action;
          segment.track(key, props)
          //if(idx == 0) {
          //  segment.track(key, props)
          //}
          div = document.createElement('div')
          div.innerHTML = JSON.stringify(e)
          listEventEl.append(div)
        })
      })
    })
  }
}