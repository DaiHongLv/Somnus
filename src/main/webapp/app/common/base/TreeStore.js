Ext.define('somnus.common.base.TreeStore', {
	extend: 'Ext.data.TreeStore',
	constructor: function (config) {
		config = Ext.apply({}, config);
		Ext.applyIf(config, {
			proxy: {
				type: 'ajax',
				url:config.url,
				api: {
					read: config.readUrl || app.contextPath + '/base/'+config.baseUrl +'!treeGrid.action',
					create: app.contextPath + '/base/'+config.baseUrl +'!save.action',
					update: app.contextPath + '/base/'+config.baseUrl +'!update.action',
					destroy: app.contextPath + '/base/'+config.baseUrl +'!delete.action',
				},
				actionMethods: {
					read: 'POST'
				},
				extraParams: config.extraParams || '',
				timeout: 1000 * 60 * 60,
				extractResponseData: function(response) {
		            var json = Ext.loadFilter(Ext.JSON.decode(response.responseText),{parentField : 'pid'});
		            Ext.each(json,function(record){
		            	if(Ext.isEmpty(record.children)){
		          	  		record.expanded = false;
		          	  		record.leaf = true;
		          	  	}else{
		          	  		record.expanded = true;
		          	  		Ext.each(record.children,function(rec){
		          	  			if(Ext.isEmpty(rec.children)){
		          	  				rec.expanded = false;
		          	  				rec.leaf = true;
		          	  			}else{
		          	  				rec.expanded = false;
		          	  				rec.leaf = false;
		          	  			}
		          	  		});
		          	  	}
		            });
		            response.responseText = Ext.JSON.encode(json);
		            return response  
		        },
		        reader:"json",
		        writer: {
					type: 'json'
				},
				listeners: {
					exception: function (proxy, response, operation) {
						/*Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg: operation.getError(),
							icon: Ext.MessageBox.ERROR,
							buttons: Ext.Msg.OK
						});*/
						Ext.Msg.show({
							title: '信息',
							msg: '对不起，当前登录已过期，请重新登录！',
							buttons: Ext.Msg.OK,
							icon: Ext.Msg.INFO,
							fn: function () {
								window.location.href = app.contextPath;
							}
						});
					}
				}
			},
			autoLoad: true
		});
		this.callParent([config]);
	}
});
