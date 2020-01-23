/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import * as azdata from 'azdata';
import * as TypeMoq from 'typemoq';
import { ApiWrapper } from '../../common/apiWrapper';
import { QueryRunner } from '../../common/queryRunner';
import { ProcessService } from '../../common/processService';
import { Config } from '../../configurations/config';
import { HttpClient } from '../../common/httpClient';

export interface TestContext {

	outputChannel: vscode.OutputChannel;
	processService: TypeMoq.IMock<ProcessService>;
	apiWrapper: TypeMoq.IMock<ApiWrapper>;
	queryRunner: TypeMoq.IMock<QueryRunner>;
	config: TypeMoq.IMock<Config>;
	op: azdata.BackgroundOperation;
	getOpStatus: () => azdata.TaskStatus;
	httpClient: TypeMoq.IMock<HttpClient>;
}

export function createContext(): TestContext {
	let opStatus: azdata.TaskStatus;

	return {
		outputChannel: {
			name: '',
			append: () => { },
			appendLine: () => { },
			clear: () => { },
			show: () => { },
			hide: () => { },
			dispose: () => { }
		},
		processService: TypeMoq.Mock.ofType(ProcessService),
		apiWrapper: TypeMoq.Mock.ofType(ApiWrapper),
		queryRunner: TypeMoq.Mock.ofType(QueryRunner),
		config: TypeMoq.Mock.ofType(Config),
		httpClient: TypeMoq.Mock.ofType(HttpClient),
		op: {
			updateStatus: (status: azdata.TaskStatus) => {
				opStatus = status;
			},
			id: '',
			onCanceled: new vscode.EventEmitter<void>().event,
		},
		getOpStatus: () => { return opStatus; }
	};
}
