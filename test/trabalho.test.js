const GerenciadorDeTarefas = require("../src/Trabalho01Tumar01");

describe('Testes da classe Banco', () => {
    let gerenciador

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('deve adicionar uma tarefa válida', () => {
        const tarefa = { descricao: 'Tarefa importante' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.tarefas).toContain(tarefa);
    });
    test('deve lançar um erro ao adicionar uma tarefa com descrição curta', () => {
        const tarefa = { descricao: 'abc' };
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');
    });

    test('deve remover uma tarefa com sucesso', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);
        expect(gerenciador.listarTarefas()).toHaveLength(0);
    });

    test('deve buscar uma tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(1)).toEqual(tarefa);
    });

    test('deve atualizar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Tarefa Atualizada' });
        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Tarefa Atualizada');
    });

    test('deve listar todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('deve contar todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('deve marcar tarefa como concluída', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa1]);
    });

    test('deve listar tarefas pendentes', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('deve remover tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2]);
    });

    test('deve buscar tarefas por descrição', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa Importante' };
        const tarefa2 = { id: 2, descricao: 'Outra Tarefa' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.buscarTarefaPorDescricao('Importante')).toEqual([tarefa1]);
    });

    test('deve adicionar e remover tags de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa com tags' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'tag1');
        gerenciador.adicionarTagATarefa(1, 'tag2');
        expect(gerenciador.buscarTarefaPorId(1).tags).toEqual(['tag1', 'tag2']);
        gerenciador.removerTagDaTarefa(1, 'tag1');
        expect(gerenciador.buscarTarefaPorId(1).tags).toEqual(['tag2']);
    });

    test('deve listar tarefas por tag', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa com tag', tags: ['tag1'] };
        const tarefa2 = { id: 2, descricao: 'Outra tarefa', tags: ['tag2'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('tag1')).toEqual([tarefa1]);
    });

    test('deve buscar tarefas por data', () => {
        const tarefa = { id: 1, descricao: 'Tarefa de data', data: '2024-09-04' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefasPorData('2024-09-04')).toEqual([tarefa]);
    });

    test('deve atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 5);
        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe(5);
    });

    test('deve listar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa1]);
    });

    test('deve contar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(2);
    });



    test('deve marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas().every(tarefa => tarefa.concluida)).toBe(true);
    })

    });
   



    

   
