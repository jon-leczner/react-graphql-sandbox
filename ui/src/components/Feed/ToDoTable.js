import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';

import ActionButtons from './ActionButtons';

import cuid from 'cuid';

class ToDoTable extends Component {
    state = {
        columnDefs: [
            {
                field: 'description',
                autoHeight: true,
                valueSetter: (params) => {
                    params.data.description = params.newValue;
                    return true;
                },
            },
            {
                field: 'priority',
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: ['Highest', 'High', 'Medium', 'Low', 'Lowest'],
                },
            },
            {
                field: 'dueDate',
            },
            {
                field: 'createdAt',
                editable: false,
            },
            {
                cellRenderer: 'actionButtonsRenderer',
                cellRendererParams: (params) => {
                    return {
                        toggleEdit: this.toggleEdit,
                        save: this.save,
                        deleteToDo: this.deleteToDo,
                    };
                },
                editable: false,
                resizable: false,
                sortable: false,
            },
        ],
        defaultColumnDef: {
            editable: true,
            resizable: true,
            sortable: true,
        },
        gridOptions: {
            frameworkComponents: {
                actionButtonsRenderer: ActionButtons,
            },
            rowSelection: 'single',
        },
        isNewRowPending: false,
    };

    getRowNodeId = (data) => {
        return data.id;
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
        this.gridApi.addEventListener('rowEditingStarted', this.onEditStart);
        this.gridApi.addEventListener('rowEditingStopped', this.onEditStop);
    };

    onEditStart = () => {
        this.setState({ isNewRowPending: true });
    };

    onEditStop = () => {
        this.setState({ isNewRowPending: false });
    };

    toggleEdit = (node, isEditEnabled) => {
        if (isEditEnabled) {
            this.gridApi.stopEditing(true);
        } else {
            this.gridApi.startEditingCell({
                rowIndex: node.rowIndex,
                colKey: 'description',
            });
        }
    };

    save = (node) => {
        this.gridApi.stopEditing();

        const { id, description, dueDate, priority } = node.data;

        const variables = {
            variables: {
                id,
                input: {
                    description,
                    dueDate,
                    priority,
                },
            },
        };

        const toDoExists =
            this.props.toDos.findIndex((toDo) => toDo.id === id) !== -1;

        if (toDoExists) {
            this.props.updateToDo(variables);
        } else {
            this.props.createToDo(variables);
        }

        this.props.refreshToDos();
    };

    deleteToDo = (node) => {
        this.gridApi.stopEditing();
        this.gridApi.applyTransaction({ remove: [node] });
        this.props.deleteToDo({ variables: { id: node.id } });
    };

    addRow = () => {
        const id = cuid();
        const newRow = { id };

        this.gridApi.applyTransaction({ add: [newRow] });

        const node = this.gridApi.getRowNode(id);

        this.gridApi.ensureIndexVisible(node.rowIndex);
        setTimeout(() => {
            // timeout ensures the new row is added before editing starts
            this.gridApi.startEditingCell({
                rowIndex: node.rowIndex,
                colKey: 'description',
            });
        }, 300);
    };

    render() {
        const {
            columnDefs,
            defaultColumnDef,
            gridOptions,
            isNewRowPending,
        } = this.state;

        const { toDos } = this.props;

        return (
            <div>
                <div className="ag-theme-alpine todo-table-container">
                    <AgGridReact
                        columnDefs={columnDefs}
                        defaultColDef={defaultColumnDef}
                        editType={'fullRow'}
                        getRowNodeId={this.getRowNodeId}
                        gridOptions={gridOptions}
                        onGridReady={this.onGridReady}
                        rowData={toDos}
                        suppressClickEdit={true}
                    />
                </div>
                <button
                    className="new-todo-button"
                    disabled={isNewRowPending}
                    onClick={this.addRow}
                >
                    New
                </button>
            </div>
        );
    }
}

export default ToDoTable;
