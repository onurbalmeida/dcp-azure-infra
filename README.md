# dcp-azure-infra
* Using Azure Cloud (AKS, Redis, Storage, Azure Cognitive Search, Event Hubs, Container Registry & PostgreSQL)
* Pulumi as IaC

### Initial setup
Login into azure using azure CLI
```bash
az login
```

or set ARM env vars
```bash
ARM_CLIENT_SECRET: 
ARM_SUBSCRIPTION_ID: 
ARM_TENANT_ID: 
ARM_CLIENT_ID: 
```

After you can just hit
```bash
make start-dev
```

### Run in the local environment
Just go to `infra`:
* `touch .env`
  * SP_PASSWORD=`<Azure service principal password>`
  * PG_PASSWORD=`<Azure PostgreSQL password>`

### Notes
* Try `pulumi` was on my todo list
