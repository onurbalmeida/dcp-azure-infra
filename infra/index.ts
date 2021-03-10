import * as dotenv from 'dotenv';
import * as pulumi from '@pulumi/pulumi'
import * as azure from '@pulumi/azure'
import { createContainerRegistry } from "./containerRegistry";
import { createAKS } from "./aks";
import { createServiceSearch } from "./serviceSearch";
import { createRedisCache } from "./redisCache";
import { createPgDatabase } from "./pgDatabase";
import { createEventHubs } from "./eventHubs";
import { createStorageAccount } from "./storageAccount";

const stack = pulumi.getStack();
const config = new pulumi.Config();
const location = config.get('location') || 'northeurope';
const defaultTags = { "Environment": stack };

dotenv.config();
const spPassword = process.env.SP_PASSWORD!;
const pgPassword = process.env.PG_PASSWORD!;
const spPasswordName = `dcp${stack}aksSpPassword123456789`;
const spName = `dcp${stack}ks123456789`;

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup('resource-group', {
    tags: defaultTags,
    name: pulumi.interpolate`dcp-${stack}-rg`,
    location: location
});

const containerRegistry = createContainerRegistry(stack, resourceGroup, defaultTags);
const aks = createAKS(stack, resourceGroup, defaultTags, spName, spPasswordName, spPassword, containerRegistry);
const serviceSearch = createServiceSearch(stack, resourceGroup, defaultTags);
const redisCache = createRedisCache(stack, resourceGroup, defaultTags);
const pgDatabase = createPgDatabase(stack, resourceGroup, defaultTags, pgPassword);
const storageAccount = createStorageAccount(stack, resourceGroup, defaultTags);
const eventHubs = createEventHubs(stack, resourceGroup, defaultTags);