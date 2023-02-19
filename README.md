## each notion page is expected to satisfy below

- property
    - status :string<public|secret>
    - if public the page will be deployed. if secret, it will be ignored by CMS and never be deployed.
    
    - caption : string 
    - page caption. used to display page preview, propably in a "/blog" or "/" endpoint.

    - tags :multiselect<string>
    - used to filter page contents.