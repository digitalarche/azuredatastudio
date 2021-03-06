/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TreeNode } from 'sql/workbench/contrib/objectExplorer/common/treeNode';
import { ConnectionProfile } from 'sql/platform/connection/common/connectionProfile';
import { IConnectionProfile } from 'sql/platform/connection/common/interfaces';
import { Event } from 'vs/base/common/event';
import { ServerTreeView } from 'sql/workbench/contrib/objectExplorer/browser/serverTreeView';
import { ObjectExplorerNodeEventArgs, IObjectExplorerService, NodeExpandInfoWithProviderId } from 'sql/workbench/services/objectExplorer/browser/objectExplorerService';
import * as azdata from 'azdata';
import * as TypeMoq from 'typemoq';

export type ObjectExplorerServiceMockOptions = {
	/**
	 * Return value for getServerTreeView
	 */
	serverTreeView?: ServerTreeView;
	/**
	 * Return value for getTreeNode
	 */
	treeNode?: TreeNode;
};

/**
 *
 * @param options Options to use for setting up functions on the mock to return various values
 */
export function createObjectExplorerServiceMock(options: ObjectExplorerServiceMockOptions): TypeMoq.Mock<IObjectExplorerService> {
	const objectExplorerService = TypeMoq.Mock.ofType(TestObjectExplorerService);

	if (options.treeNode) {
		objectExplorerService.setup(x => x.getTreeNode(TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns(() => Promise.resolve(options.treeNode));
	}

	if (options.serverTreeView) {
		objectExplorerService.setup(x => x.getServerTreeView()).returns(() => options.serverTreeView);
	}

	return objectExplorerService;
}

/**
 * A basic implementation of IObjectExplorerService to use for testing
 */
export class TestObjectExplorerService implements IObjectExplorerService {

	public _serviceBrand: undefined;

	constructor() { }

	public getSession(sessionId: string): azdata.ObjectExplorerSession { return undefined; }

	public providerRegistered(providerId: string): boolean { return true; }

	public get onUpdateObjectExplorerNodes(): Event<ObjectExplorerNodeEventArgs> { return undefined; }

	public get onSelectionOrFocusChange(): Event<void> { return undefined; }

	public updateObjectExplorerNodes(connection: IConnectionProfile): Promise<void> { return Promise.resolve(); }

	public deleteObjectExplorerNode(connection: IConnectionProfile): Thenable<void> { return Promise.resolve(); }

	public onNodeExpanded(expandResponse: NodeExpandInfoWithProviderId) { }

	public onSessionCreated(handle: number, session: azdata.ObjectExplorerSession): void { }

	public onSessionDisconnected(handle: number, session: azdata.ObjectExplorerSession) { }

	public getObjectExplorerNode(connection: IConnectionProfile): TreeNode { return undefined; }

	public async createNewSession(providerId: string, connection: ConnectionProfile): Promise<azdata.ObjectExplorerSessionResponse> { return undefined; }

	public expandNode(providerId: string, session: azdata.ObjectExplorerSession, nodePath: string): Thenable<azdata.ObjectExplorerExpandInfo> { return Promise.resolve(undefined); }

	public refreshNode(providerId: string, session: azdata.ObjectExplorerSession, nodePath: string): Thenable<azdata.ObjectExplorerExpandInfo> { return Promise.resolve(undefined); }

	public closeSession(providerId: string, session: azdata.ObjectExplorerSession): Thenable<azdata.ObjectExplorerCloseSessionResponse> { return Promise.resolve(undefined); }

	public registerProvider(providerId: string, provider: azdata.ObjectExplorerProvider): void { }

	public registerNodeProvider(nodeProvider: azdata.ObjectExplorerNodeProvider): void { }

	public resolveTreeNodeChildren(session: azdata.ObjectExplorerSession, parentTree: TreeNode): Thenable<TreeNode[]> { return Promise.resolve(undefined); }

	public refreshTreeNode(session: azdata.ObjectExplorerSession, parentTree: TreeNode): Thenable<TreeNode[]> { return Promise.resolve(undefined); }

	public registerServerTreeView(view: ServerTreeView): void { }

	public getSelectedProfileAndDatabase(): { profile: ConnectionProfile, databaseName: string } { return undefined; }

	public isFocused(): boolean { return true; }

	public getServerTreeView(): ServerTreeView { return undefined; }

	public findNodes(connectionId: string, type: string, schema: string, name: string, database: string, parentObjectNames?: string[]): Thenable<azdata.NodeInfo[]> { return Promise.resolve(undefined); }

	public getActiveConnectionNodes(): TreeNode[] { return undefined; }

	public getNodeActions(connectionId: string, nodePath: string): Thenable<string[]> { return Promise.resolve(undefined); }

	public async refreshNodeInView(connectionId: string, nodePath: string): Promise<TreeNode> { return Promise.resolve(undefined); }

	public getSessionConnectionProfile(sessionId: string): azdata.IConnectionProfile { return undefined; }

	public async getTreeNode(connectionId: string, nodePath: string): Promise<TreeNode> { return Promise.resolve(undefined); }
}
