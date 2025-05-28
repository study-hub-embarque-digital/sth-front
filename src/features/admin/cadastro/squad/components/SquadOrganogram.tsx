import React, { useEffect, useCallback } from 'react';
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
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, Typography, Avatar } from '@mui/material';
import globalService from '../../../../../services/globalService';
import { useParams } from 'react-router-dom';

const nodeTypes = {};
const snapGrid: [number, number] = [20, 20];
const defaultViewport = { x: 0, y: 0, zoom: 1 };

const SquadOrganogram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const navigate = useNavigate();
  const { id } = useParams();


  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const nodeCard = (id: string, name: string, role: string, photo: string, type: 'mentor' | 'aluno' | 'representante') => (
    <Card
      onClick={() => navigate(`/${type}s/detalhes-${type}/${id}`)}
      sx={{
        width: 130,
        textAlign: 'center',
        backgroundColor: '#9c27b0',
        color: '#fff',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Avatar sx={{ width: 56, height: 56, mx: 'auto', mb: 1, bgcolor: '#7b1fa2' }} src={photo}>
          {!photo && getInitials(name)}
        </Avatar>
        <Typography variant="body2" fontWeight="bold">{name}</Typography>
        <Typography variant="caption">{role}</Typography>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    const fetchSquad = async () => {
      try {
        const squad = await globalService.getSquadById(id!);

        const mentor = squad.mentorDto.usuarioDto;
        const reps = squad.representanteListDtos.map((rep: any, i: number) => ({
          id: `rep-${i}`,
          ...rep.usuarioDto,
        }));
        const members = squad.alunoListDtos.map((aluno: any, i: number) => ({
          id: `aluno-${i}`,
          ...aluno.usuarioDto,
        }));

        const mentorNode = {
          id: 'mentor',
          position: { x: 250, y: 0 },
          data: { label: nodeCard(mentor.id, mentor.nome, 'Mentor(a)', mentor.fotoPerfil, 'mentor') },
          sourcePosition: Position.Bottom,
          type: 'default',
        };

        const repNodes = reps.map((rep: any, i: number) => ({
          id: rep.id,
          position: { x: 100 + i * 300, y: 100 },
          data: { label: nodeCard(rep.id, rep.nome, 'Representante', rep.fotoPerfil, 'representante') },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          type: 'default',
        }));

        const squadNode = {
          id: 'squad',
          position: { x: 250, y: 200 },
          data: {
            label: (
              <Card sx={{ width: 130, textAlign: 'center', backgroundColor: '#6a1b9a', color: '#fff' }}>
                <CardContent>
                  <Typography variant="body2" fontWeight="bold">
                    {squad.nome}
                  </Typography>
                </CardContent>
              </Card>
            ),
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          type: 'default',
        };

        const memberNodes = members.map((member: any, i: number) => ({
          id: member.id,
          position: { x: 50 + i * 150, y: 350 },
          data: { label: nodeCard(member.id, member.nome, 'Aluno(a)', member.fotoPerfil, 'aluno') },
          targetPosition: Position.Top,
          type: 'default',
        }));

        // Monta edges dinamicamente
        const newEdges = [
          { id: 'e-mentor-squad', source: 'mentor', target: 'squad', animated: true },
          ...reps.map((rep: any) => ({
            id: `e-${rep.id}-squad`,
            source: rep.id,
            target: 'squad',
            animated: true,
          })),
          ...members.map((member: any) => ({
            id: `e-squad-${member.id}`,
            source: 'squad',
            target: member.id,
            animated: true,
          })),
        ];

        setNodes([mentorNode, ...repNodes, squadNode, ...memberNodes]);
        setEdges(newEdges);
      } catch (error) {
        console.error("Erro ao carregar os dados do squad:", error);
      }
    };

    fetchSquad();
  }, [id]);

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

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

export default SquadOrganogram;
