import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Card, CardContent, Typography, Avatar } from '@mui/material';
import logoLogin from '../../../assets/logoLoginPink.png';

const nodeTypes = {};
const snapGrid = [20, 20];
const defaultViewport = { x: 0, y: 0, zoom: 1 };

const nodeCard = (name, role, photo) => (
  <Card sx={{ width: 130, textAlign: 'center', backgroundColor: '#9c27b0', color: '#fff' }}>
    <CardContent>
      <Avatar src={photo} alt={name} sx={{ width: 56, height: 56, mx: 'auto', mb: 1 }} />
      <Typography variant="body2" fontWeight="bold">{name}</Typography>
      <Typography variant="caption">{role}</Typography>
    </CardContent>
  </Card>
);

const OrgChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const squadData = {
    mentor: { id: '1', name: 'Maiara', role: 'Mentora do Porto', photo: logoLogin },
    reps: [
      { id: '2', name: 'Cassandra', role: 'Representante de Empresa', photo: logoLogin },
      { id: '3', name: 'Bianca', role: 'Representante de Empresa', photo: logoLogin },
    ],
    squad: { id: '5', label: 'Squad 13' },
    members: [
      { id: '6', name: 'Lisa', role: 'Aluna', photo: logoLogin },
      { id: '7', name: 'Carla', role: 'Aluna', photo: logoLogin },
      { id: '8', name: 'Priscila', role: 'Aluna', photo: logoLogin },
      { id: '9', name: 'Amanda', role: 'Aluna', photo: logoLogin },
    ],
  };

  useEffect(() => {
    const mentorNode = {
      id: squadData.mentor.id,
      position: { x: 250, y: 0 },
      data: { label: nodeCard(squadData.mentor.name, squadData.mentor.role, squadData.mentor.photo) },
      sourcePosition: Position.Bottom,
      type: 'default',
    };

    const repNodes = squadData.reps.map((rep, i) => ({
      id: rep.id,
      position: { x: 100 + i * 300, y: 100 },
      data: { label: nodeCard(rep.name, rep.role, rep.photo) },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      type: 'default',
    }));

    const squadNode = {
      id: squadData.squad.id,
      position: { x: 250, y: 200 },
      data: {
        label: (
          <Card sx={{ width: 130, textAlign: 'center', backgroundColor: '#6a1b9a', color: '#fff' }}>
            <CardContent>
              <Typography variant="body2" fontWeight="bold">
                {squadData.squad.label}
              </Typography>
            </CardContent>
          </Card>
        ),
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      type: 'default',
    };

    const memberNodes = squadData.members.map((member, i) => ({
      id: member.id,
      position: { x: 50 + i * 150, y: 350 },
      data: { label: nodeCard(member.name, member.role, member.photo) },
      targetPosition: Position.Top,
      type: 'default',
    }));

    setNodes([mentorNode, ...repNodes, squadNode, ...memberNodes]);

    setEdges([
      { id: 'e1-5', source: '1', target: '5', animated: true },
      { id: 'e2-5', source: '2', target: '5', animated: true },
      { id: 'e3-5', source: '3', target: '5', animated: true },
      { id: 'e5-6', source: '5', target: '6', animated: true },
      { id: 'e5-7', source: '5', target: '7', animated: true },
      { id: 'e5-8', source: '5', target: '8', animated: true },
      { id: 'e5-9', source: '5', target: '9', animated: true },
    ]);
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ReactFlow
        elementsSelectable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView
        defaultViewport={defaultViewport}
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OrgChart;
