import { createClient } from '@supabase/supabase-js'

const urlSupabase = 'https://afityicmmtpsdousbixf.supabase.co';
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaXR5aWNtbXRwc2RvdXNiaXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NzAxODUsImV4cCI6MjA2MjE0NjE4NX0.Ti0Ecq_09PptfKy7GqEN5mzZHHVp3AgfWriTOYTs8TA';
const supabase = createClient(supabaseUrl, supabaseKey)

export const studentCRUD = {

  async create(studentData) {
    const { data, error } = await supabase
      .from('alunos')
      .insert([studentData])
      .select()

    if (error) {
      console.error('Erro ao criar aluno:', error)
      return null
    }
    return data[0]
  },

  async readAll() {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .order('nome_completo', { ascending: true })

    if (error) {
      console.error('Erro ao ler alunos:', error)
      return []
    }
    return data
  },

  async readById(id) {
    const { data, error } = await supabase
      .from('alunos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao ler aluno:', error)
      return null
    }
    return data
  },

  async update(id, updatedData) {
    const { data, error } = await supabase
      .from('alunos')
      .update(updatedData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Erro ao atualizar aluno:', error)
      return null
    }
    return data[0]
  },

  async delete(id) {
    const { error } = await supabase
      .from('alunos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao excluir aluno:', error)
      return false
    }
    return true
  }
}