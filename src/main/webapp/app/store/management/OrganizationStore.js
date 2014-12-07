Ext.define("somnus.store.management.OrganizationStore",{
	extend: 'somnus.common.base.TreeStore',
	constructor: function(config) {
		config = Ext.apply({
			model: 'somnus.model.management.OrganizationModel',
			baseUrl: 'syorganization'
		}, config);
		this.callParent([config]);
	}
});