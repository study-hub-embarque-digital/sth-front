import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    TextField,
    CircularProgress,
    Backdrop,
    MenuItem,
} from "@mui/material";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import squadsService from "../../../../services/squadsService";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const steps = [
    "Informações Básicas",
    "Selecionar Alunos",
    "Selecionar Mentor",
    "Selecionar Empresa",
    "Selecionar Representante",
];

export default function SquadCreateStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        instituicaoDeEnsinoId: "",
        periodo: "",
        semestre: "",
        turno: "",
        mentorId: "",
        empresaId: "",
        ciclo: "",
        nome: "",
        tipo: "",
        representantesIds: [] as string[],
        alunosIds: [] as string[],
    });

    const [alunosDisponiveis, setAlunosDisponiveis] = useState<any[]>([]);
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [mentores, setMentores] = useState<any[]>([]);
    const [representantes, setRepresentantes] = useState<any[]>([]);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "info" | "warning"
    });

    const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
        setSnackbar({ open: true, message, severity });
    };

    const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        setLoading(true);
        squadsService.getInstituicoes().then(instituicoes => setInstituicoes(instituicoes ?? [])).catch(() => showSnackbar("Erro ao buscar alunos Instituições", "error"))
            .finally(() => setLoading(false));
    }, []);

    // .catch(() => setSnackbar({ open: true, message: "Erro ao buscar instituições", severity: "error" }))

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Tentando buscar alunos...", formData);
        if (
            activeStep === 1 &&
            formData.instituicaoDeEnsinoId &&
            formData.periodo &&
            formData.turno
        ) {
            console.log("Chamando a API com:", formData);
            setLoading(true);
            squadsService
                .getAlunosDisponiveis(formData)
                .then((res) => {
                    const data = Array.isArray(res) ? res : [];
                    setAlunosDisponiveis(data);
                })
                .catch(() => showSnackbar("Erro ao buscar alunos disponíveis", "error"))
                .finally(() => setLoading(false));
        }
    }, [activeStep, formData.instituicaoDeEnsinoId, formData.periodo, formData.turno]);

    useEffect(() => {
        if (activeStep === 2) {
            setLoading(true);
            squadsService
                .getMentores()
                .then((data) => setMentores(data))
                .catch(() => showSnackbar("Erro ao buscar mentores", "error"))
                .finally(() => setLoading(false));
        }
    }, [activeStep]);

    useEffect(() => {
        if (activeStep === 3) {
            setLoading(true);
            squadsService
                .getEmpresas()
                .then((data) => setEmpresas(data))
                .catch(() => showSnackbar("Erro ao buscar empresas", "error"))
                .finally(() => setLoading(false));
        }
    }, [activeStep]);

    useEffect(() => {
        if (activeStep === 4 && formData.empresaId) {
            setLoading(true);
            squadsService
                .getRepresentanteDaEmpresa(formData.empresaId)
                .then((data) => setRepresentantes(data))
                .catch(() => showSnackbar("Erro ao buscar representantes", "error"))
                .finally(() => setLoading(false));
        }
    }, [activeStep, formData.empresaId]);

    const basicFields: IFormField[] = [
        {
            name: "ciclo",
            label: "Ciclo",
            type: "select",
            options: [
                { label: "Kick Off", value: "KICK_OFF" },
                { label: "Rise Up", value: "RISE_UP" },
                { label: "Grow Up", value: "GROW_UP" },
                { label: "Take Off", value: "TAKE_OFF" },
            ],
            required: true,
        },
        {
            name: "tipo",
            label: "Tipo",
            type: "select",
            options: [
                { label: "Turma Completa", value: "TurmaCompleta" },
                { label: "Normal", value: "Normal" },
            ],
            required: true,
        },
        {
            name: "periodo",
            label: "Período",
            type: "select",
            options: [
                { label: "1º", value: "PRIMEIRO" },
                { label: "2º", value: "SEGUNDO" },
                { label: "3º", value: "TERCEIRO" },
                { label: "4º", value: "QUARTO" },
                { label: "5º", value: "QUINTO" },
                { label: "6º", value: "SEXTO" },
                { label: "7º", value: "SETIMO" },
                { label: "8º", value: "OITAVO" },
                { label: "9º", value: "NONO" },
                { label: "10º", value: "DECIMO" },
            ],
            required: true,
        },
        {
            name: "instituicaoDeEnsinoId",
            label: "Instituição",
            type: "select",
            required: true,
            options: instituicoes.map((inst: any) => ({
                value: inst.instituicaoEnsinoId,
                label: inst.nome ?? "(Sem nome)",
            })),
        },
        {
            name: "turno",
            label: "Turno",
            type: "select",
            required: true,
            options: [
                { value: "NOITE", label: "Noturno" },
                { value: "MANHA", label: "Matutino" },
            ],
        },
        {
            name: "semestre",
            label: "Semestre",
            type: "text",
            required: true,
        },
        {
            name: "nome",
            label: "Nome",
            type: "text",
            required: true,
        },
    ];

    const handleBasicSubmit = (data: any) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setActiveStep(1);
    };

    const handleNext = () => {
        if (activeStep === 1 && formData.alunosIds.length === 0) {
            showSnackbar("Selecione pelo menos um aluno.", "warning");
            return;
        }
        if (activeStep === 3 && !formData.empresaId) {
            showSnackbar("Selecione uma empresa.", "warning");
            return;
        }
        if (activeStep === 4 && formData.representantesIds.length === 0) {
            showSnackbar("Selecione pelo menos um representante.", "warning");
            return;
        }
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSubmit = () => {
        setLoading(true);
        squadsService
            .createSquad({
                nome: formData.nome,
                mentorId: formData.mentorId,
                empresaId: formData.empresaId,
                instituicaoDeEnsinoId: formData.instituicaoDeEnsinoId,
                representantesIds: formData.representantesIds,
                alunosIds: formData.alunosIds,
                semestre: formData.semestre,
                ciclo: formData.ciclo,
                tipo: formData.tipo
            })
            .then(() => {
                showSnackbar("Squad criado com sucesso!", "success");
                setTimeout(() => navigate("/home/squads"), 2000);
            })
            .catch(() => showSnackbar("Erro ao criar squad", "error"))
            .finally(() => { setLoading(false) });
    };

    return (
        <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
            <Backdrop
                open={loading}
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Passo 0 - Info básicas */}
            {activeStep === 0 && instituicoes.length > 0 &&

                (
                    loading ? (
                        <CircularProgress />
                    ) : (

                        <DynamicForms
                            fields={basicFields}
                            initialValues={formData}
                            onSubmit={handleBasicSubmit}
                            defaultEditable={true}
                        />))


            }

            {/* Passo 1 - Selecionar alunos */}
            {activeStep === 1 && (
                <>
                    <Typography>Selecione os alunos disponíveis</Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Box>
                            {alunosDisponiveis.map((aluno) => (
                                <label key={aluno.alunoId} style={{ display: "block" }}>
                                    <input
                                        type="checkbox"
                                        value={aluno.alunoId}
                                        checked={formData.alunosIds.includes(aluno.alunoId)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const id = e.target.value;
                                            setFormData((prev) => {
                                                const ids = prev.alunosIds;
                                                return {
                                                    ...prev,
                                                    alunosIds: checked
                                                        ? [...ids, id]
                                                        : ids.filter((x) => x !== id),
                                                };
                                            });
                                        }}
                                    />
                                    {aluno.usuarioDto.nome} - {aluno.curso}
                                </label>
                            ))}
                        </Box>
                    )}
                </>
            )}

            {/* Passo 2 - Selecionar mentor */}
            {activeStep === 2 && (
                <>
                    <Typography>Informe o Mentor</Typography>
                    <DynamicForms
                        fields={[
                            {
                                name: "mentorId",
                                label: "Mentor",
                                type: "select",
                                required: true,
                                options: mentores.map((ment: any) => ({
                                    value: ment.id,
                                    label: ment.usuarioDto.nome ?? "(Sem nome)",
                                }))
                            },
                        ]}
                        initialValues={formData}
                        onSubmit={(data) => {
                            setFormData((prev) => ({ ...prev, ...data }));
                            setActiveStep(3);
                        }}
                        defaultEditable={true}

                    />
                </>
            )}

            {/* Passo 3 - Selecionar empresa */}
            {activeStep === 3 && (
                <>
                    <Typography>Selecione a empresa</Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Box>
                            {empresas.map((empresa) => (
                                <label key={empresa.empresaId} style={{ display: "block" }}>
                                    <input
                                        type="radio"
                                        name="empresa"
                                        value={empresa.empresaId}
                                        checked={formData.empresaId === empresa.empresaId}
                                        onChange={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                empresaId: empresa.empresaId,
                                                representantesIds: [],
                                            }))
                                        }
                                    />
                                    {empresa.nomeFantasia}
                                </label>
                            ))}
                        </Box>
                    )}
                </>
            )}

            {/* Passo 4 - Selecionar representantes */}
            {activeStep === 4 && (
                <>
                    <Typography>Selecione representantes da empresa</Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Box>
                            {representantes.map((rep) => (
                                <label key={rep.id} style={{ display: "block" }}>
                                    <input
                                        type="checkbox"
                                        value={rep.id}
                                        checked={formData.representantesIds.includes(rep.id)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const id = e.target.value;
                                            setFormData((prev) => {
                                                const ids = prev.representantesIds;
                                                return {
                                                    ...prev,
                                                    representantesIds: checked
                                                        ? [...ids, id]
                                                        : ids.filter((x) => x !== id),
                                                };
                                            });
                                        }}
                                    />
                                    {rep.usuarioDto.nome}
                                </label>

                            ))}
                        </Box>
                    )}
                </>
            )}

            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Voltar
                </Button>

                {activeStep < steps.length - 1 ? (
                    <Button variant="contained" onClick={handleNext}>
                        Próximo
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleSubmit}>
                        Criar Squad
                    </Button>
                )}
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
}
