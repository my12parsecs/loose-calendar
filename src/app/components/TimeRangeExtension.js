
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';

// React component for the mention-like UI
const TimeRangeMentionComponent = ({ node }) => {
  const timeRange = node.attrs.timeRange;
  return (
    <NodeViewWrapper as="span" className="time-tag">
      {timeRange}
    </NodeViewWrapper>
  );
};

// Custom Node extension
const TimeRangeExtension = Node.create({
  name: 'timeRange', // Unique name for the node
  group: 'inline', // Group it as an inline node
  inline: true, // Make it an inline node
  selectable: false, // Make it non-selectable
  atom: true, // Treat it as a single unit (leaf node)

  addAttributes() {
    return {
      timeRange: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-time-range]',
        getAttrs: (dom) => ({
          timeRange: dom.getAttribute('data-time-range'),
        }),
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    // Render the node without any content hole
    return ['span', { ...HTMLAttributes, 'data-time-range': node.attrs.timeRange }, node.attrs.timeRange];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TimeRangeMentionComponent);
  },
});

export default TimeRangeExtension;