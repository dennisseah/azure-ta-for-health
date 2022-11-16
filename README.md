# Azure Text Analytics for HealthCare

## 1. Azure Setup

1. Create a resource group
2. Create the [Azure Cognitive Services Text Analytics](https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesTextAnalytics) in this resource group.
3. Once the service is successfully created, copy the key and endpoint values.

## 2. Local Setup

Git clone and

```shell
cd azure-ta-for-health
yarn install
```

Create a `.env` file with

```shell
REACT_APP_AZURE_LANG_KEY=<the key value (see step 3 in Azure Setup) >
REACT_APP_AZURE_LANG_ENDPOINT=<the endpoint value (see step 3 in Azure Setup) >
```
## 3. Running the app

```shell
yarn start
```
