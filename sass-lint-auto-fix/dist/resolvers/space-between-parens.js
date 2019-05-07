"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_resolver_1 = require("./base-resolver");
const gonzales = require('gonzales-pe-sl');
class SpaceBetweenParens extends base_resolver_1.default {
    fix() {
        const { ast } = this;
        ast.traverseByType('arguments', (node) => {
            const first = node.first();
            const last = node.last();
            const spaceNode = gonzales.createNode({
                type: 'space',
                content: ' ',
            });
            if (node.length === 0) {
                return;
            }
            if (!first || !last) {
                return;
            }
            if (this.parser.options.include) {
                if (!first.is('space')) {
                    // Add space node to the begining
                    node.content.splice(0, 0, spaceNode);
                }
                if (!last.is('space')) {
                    // Add space node to the end
                    node.content.push(spaceNode);
                }
            }
            else {
                if (first.is('space')) {
                    // Remove space node from the begining
                    node.removeChild(0);
                }
                if (last.is('space')) {
                    // Remove space node from the end
                    node.removeChild(-1);
                }
            }
        });
        return ast;
    }
}
exports.default = SpaceBetweenParens;
