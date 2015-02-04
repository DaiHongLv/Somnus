Ext.define('somnus.view.management.OrganizationView',{
	extend: 'somnus.common.base.BaseTreeGrid',
	alias: 'widget.organizationView',
	title: '机构管理',
	frame: true,
	autoQuery: false,
	initComponent: function () {
		Ext.apply(this, {
			iconCls:'ext-icon-group_link',
			store: 'management.OrgStore',
			autoQuery: false,
			forceFit: true,
			columns:[{
				xtype : 'treecolumn',
				text : '机构名称',
				dataIndex : 'name',
				width : 200
			},{
				text : '图标名称',
				dataIndex : 'iconCls',
				width : 200
			},{
				text : '机构编码',
				dataIndex : 'code',
				width : 200
			},{
				text : '机构地址',
				dataIndex : 'address',
				width : 200
			},{
				text : '创建时间',
				dataIndex : 'createdatetime',
				width : 150,
				hidden : true,
				sortable : true
			},{
				text : '修改时间',
				dataIndex : 'updatedatetime',
				width : 150,
				hidden : true,
				sortable : true
			},{
				text : '排序',
				dataIndex : 'seq',
				width : 80,
				hidden : true
			},{
				text : '操作',
				xtype : 'actioncolumn',
				dataIndex : 'action',
				width : 60,
				items:[{
					iconCls:'ext-icon-note',
					action:'show',
					tooltip:'查看',
					handler: function(grid, rowIndex, colIndex, item) {  
						var rec = grid.getStore().getAt(rowIndex);
						this.fireEvent('showclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-note_edit',
					action:'edit',
					tooltip:'编辑',
					handler: function(grid, rowIndex, colIndex, item) {  
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('editclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-group_key',
					action:'grant',
					tooltip:'授权',
					handler: function(grid, rowIndex, colIndex, item) {
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('grantclick', {  
							record: rec  
						});
					}
				},{
					iconCls:'ext-icon-note_delete',
					action:'delete',
					tooltip:'删除',
					handler: function(grid, rowIndex, colIndex, item) {
						var rec = grid.getStore().getAt(rowIndex);  
						this.fireEvent('deleteclick', {  
							record: rec  
						});
					}
				}]
			}],
			dockedItems:[{
				xtype : 'toolbar',
				dock : 'top',
				items:[{
					xtype:'button',
					action:'add',
					text:'添加',
					iconCls:'ext-icon-note_add'
				},{
					xtype:'button',
					action:'allopen',
					text:'展开',
					iconCls:'ext-icon-resultset_next'
				},{
					xtype:'button',
					action:'allclose',
					text:'折叠',
					iconCls:'ext-icon-resultset_previous'
				},{
					xtype:'button',
					action:'refresh',
					text:'刷新',
					iconCls:'ext-icon-arrow_refresh'
				}]
			}]
		});
		this.callParent(arguments);
	}
});