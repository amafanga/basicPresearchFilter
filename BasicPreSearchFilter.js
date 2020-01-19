//------------------------------------------------------------------------------------//
// In this solution we are applying basic pre-search-filter to the aaccount entity
// Feel free to reuse this code and credit the author : A. Mafanga (D365 Ramp)
//------------------------------------------------------------------------------------//

if (typeof (D365) == "undefined") {
    D365 = { __namespace: true };
}
D365.AccountFunctions = {
    //-----------------------------------------------------------------------------------//
    // Attach all events that are triggered when the form loads to this function (onLoad)
    // This is the only event we call when the form loads. 
    //-----------------------------------------------------------------------------------//
    onLoad: function(executionContext)
    {        
        //Here we get our parameter values from the execution context
        D365.AccountFunctions.entityName = formContext.data.entity.getEntityName(); //entity name
        D365.AccountFunctions.entityId = formContext.data.entity.getId(); //entity id    

        //Here we call the 'filterContacts' methos/function and we pass the parameter values
        D365.AccountFunctions.filterContacts(executionContext, entityName, entityId);
    },

    //-------------------------------------------------------------------//
    // Filter available substatuses based on security role of loggedin user
    //------------------------------------------------------------------//
    addPreSearchToPrimaryContactField: function (formContext) {
        formContext.getControl("cre60_companyceo").addPreSearch(D365.AccountFunctions.removeContactBeginingWithA);
        formContext.getControl("header_process_cre60_companyceo").addPreSearch(D365.AccountFunctions.removeContactBeginingWithA);
    },

    //--------------------------------------------------------------------//
    // Remove sub status from the list based on current user security role
    //--------------------------------------------------------------------/
    removeContactBeginingWithA: function (executionContext) {
        var formContext = executionContext.getFormContext();
        // The query is generated using advanced find
        var contactFilter = "<filter type='and'>" +
            "<condition attribute='firstname' operator='not-like' value='B%' />" +
            "</filter>";
        // Here we attached the filter to the account primary contact ID field.       
        formContext.getControl("cre60_companyceo").addCustomFilter(contactFilter, "account");
        //formContext.getControl("header_process_cre60_companyceo").addCustomFilter(contactFilter, "account");
    },
    namespace: true
};