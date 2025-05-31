import { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Skeleton } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";
import graficosService from "../../../../services/graficos/graficosAdminService";
import React from "react";

interface ChartData {
  name: string;
  value: number;
}

interface EmpresasCicloData {
  ciclo: string;
  empresas: number;
}

export default function AdminPage() {
  const [squadsEmpresa, setSquadsEmpresa] = useState<ChartData[]>([]);
  const [alunosIES, setAlunosIES] = useState<ChartData[]>([]);
  const [empresasCiclo, setEmpresasCiclo] = useState<EmpresasCicloData[]>([]);
  const [alunosTrabalhoPeriodo, setAlunosTrabalhoPeriodo] = useState<ChartData[]>([]);
  const [alunosGenero, setAlunosGenero] = useState<ChartData[]>([]);
  const [alunosCurso, setAlunosCurso] = useState<ChartData[]>([]);
  const [squadsDemoday, setSquadsDemoday] = useState<ChartData[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          squadsEmpresaData,
          alunosIESData,
          empresasCicloData,
          alunosTrabalhoPeriodoData,
          alunosGeneroData,
          alunosCursoData,
          squadsDemodayData,
        ] = await Promise.all([
          graficosService.getSquadsEmpresa(),
          graficosService.getAlunosAtivosIes(),
          graficosService.getEmpresasCiclo(),
          graficosService.getAlunosTrabalhoPeriodo(),
          graficosService.getAlunosGenero(),
          graficosService.getAlunosCurso(),
          graficosService.getSquadDemodayIes(),
        ]);

        setSquadsEmpresa(
          squadsEmpresaData.map((item) => ({
            name: item.nomeEmpresa,
            value: item.quantidadeSquads,
          }))
        );

        setAlunosIES(
          alunosIESData.map((item) => ({
            name: item.nomeInstituicao,
            value: item.alunosAtivos,
          }))
        );

        setEmpresasCiclo(
          empresasCicloData.map((item) => ({
            ciclo: item.ciclo,
            empresas: item.totalEmpresas,
          }))
        );

        setAlunosTrabalhoPeriodo(
          alunosTrabalhoPeriodoData.map((item) => ({
            name: item.periodo,
            value: item.totalTrabalhando,
          }))
        );

        setAlunosGenero(
          alunosGeneroData.map((item) => ({
            name: item.genero,
            value: item.total,
          }))
        );

        setAlunosCurso(
          alunosCursoData.map((item) => ({
            name: item.curso,
            value: item.quantidade,
          }))
        );

        setSquadsDemoday(
          squadsDemodayData.map((item) => ({
            name: item.nomeFantasia,
            value: item.totalSquads,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados dos gráficos:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <Grid container spacing={2}>
      {/* Squads por Empresa */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Squads por empresa</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={squadsEmpresa}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Alunos por IES */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Alunos por IES</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={alunosIES}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#82ca9d"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Empresas por Ciclo */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Empresas por ciclo</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={empresasCiclo}>
                  <XAxis dataKey="ciclo" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="empresas" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Alunos atuando por período */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Alunos atuando por período</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart layout="vertical" data={alunosTrabalhoPeriodo}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Alunos por Gênero */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Alunos por gênero</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={alunosGenero}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#ffc658"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Alunos por Curso */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Alunos por curso</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={alunosCurso}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Squads por IES (DemoDay) */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Squads por IES - DemoDay</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={200} animation="wave" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={squadsDemoday}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
