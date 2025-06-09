# Projeto Escola - Sistema de Gestão de Alunos

## 📝 Descrição
Sistema de gestão escolar completo para administração de alunos com CRUD integrado ao Supabase.

## ✨ Funcionalidades
- ✅ Cadastro completo de alunos
- ✏️ Edição e exclusão de registros
- 🏷️ Filtro por status (Ativo/Inativo)
- 📊 Estatísticas em tempo real
- 🔒 Autenticação segura
- 📱 Design responsivo

## 🛠 Tecnologias
### Frontend
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)]()
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)]()

### Backend/DB
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)]()

## 🚀 Execução
```bash
git clone https://github.com/sanches8/Projeto-Carolina-Macedo.git
cd Projeto-Carolina-Macedo
```
## 📊 SQL

```
CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome_completo VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  turma VARCHAR(20) NOT NULL,
  idade INTEGER NOT NULL,
  responsavel VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  email VARCHAR(100),
  status VARCHAR(10) DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT NOW()
