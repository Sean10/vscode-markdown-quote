// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
'use strict';
// import * as vscode from 'vscode';
import { commands, env, EndOfLine, ExtensionContext, Position, Range, Selection, SnippetString, TextDocument, TextEditor, window, workspace, WorkspaceEdit } from 'vscode';


enum QuoteState {
    // State 1: part of lines has been quoted, need to be quoted
    PARTIALQUOTED,
    // State 2: all of lines has been quoted, need to be unquoted
    FULLQUOTED,
}

function getQuoteState(lineArray: Array<string>): QuoteState {
    return lineArray.every(line => line.startsWith('>')) ? QuoteState.FULLQUOTED : QuoteState.PARTIALQUOTED;
}

function quoteLine(line: string): string {
    if(!line.startsWith(">")){
        return "> " + line;
    } else {
        return line;
    }
}

function unquoteLine(line: string): string {
    if (!line.startsWith("> ") && line.startsWith(">")) {
        return line.slice(1);
    }
    else if (line.startsWith("> ")) {
        return line.slice(2);
    } else {
        return line;
    }
}

function setQuote(lineArray: Array<string>, state: QuoteState, eol: string): string {
    let resultArray;
    switch(state) {
        case QuoteState.PARTIALQUOTED:
            resultArray = lineArray.map(quoteLine);
            break;
        case QuoteState.FULLQUOTED:
            resultArray = lineArray.map(unquoteLine); 
            break;
        default:
            resultArray = lineArray;
    }
    return resultArray.join(eol);
}

function toggleQuote() {
	let editor = window.activeTextEditor;
	if (editor == undefined) {
		return ;
	}
    let start = editor.selection.start;
    let end = editor.selection.end;
    start = editor.document.lineAt(start.line).range.start;
    end = editor.document.lineAt(end.line).range.end;
    let linesText = editor.document.getText(new Range(start, end));;
    let eol = editor.document.eol === EndOfLine.CRLF ? '\r\n' : '\n';

    let line_array = linesText.split(eol);
    let state = getQuoteState(line_array);
    console.log("state", state);
    let resultText = setQuote(line_array, state, eol);

    return editor.edit(editBuilder => {
        editBuilder.replace(new Range(start, end), resultText);
    });
}

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        commands.registerCommand('extension.markdownToggleQuote', toggleQuote)
    );
}

// this method is called when your extension is deactivated
export function deactivate() {}
