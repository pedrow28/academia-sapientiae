import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Scroll, BookOpen, Calendar, Plus } from 'lucide-react';

interface StudyEntry {
  id: string;
  date: string;
  subject: string;
  content: string;
  activity: string;
  pesGained: number;
  skillGained: string;
}

export const StudyJournal: React.FC = () => {
  const [entries, setEntries] = useState<StudyEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    subject: '',
    content: '',
    activity: 'philosophyReading'
  });

  const handleAddEntry = () => {
    if (newEntry.subject && newEntry.content) {
      const entry: StudyEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        subject: newEntry.subject,
        content: newEntry.content,
        activity: newEntry.activity,
        pesGained: 15, // Placeholder - would be calculated based on activity
        skillGained: 'Philosophia' // Placeholder - would be based on activity
      };
      
      setEntries([entry, ...entries]);
      setNewEntry({ subject: '', content: '', activity: 'philosophyReading' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-manuscript-title flex items-center justify-center gap-3">
          <Scroll className="w-8 h-8 text-divine-light" />
          Diarium Studiorum
          <Scroll className="w-8 h-8 text-divine-light" />
        </h1>
        <p className="text-manuscript-text text-lg">
          <em>Registre sua jornada de estudos e contemplação</em>
        </p>
      </div>

      {/* New Entry Form */}
      <Card className="medieval-border">
        <CardHeader className="bg-gradient-to-r from-divine-glow/20 to-manuscript-accent/20">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Entrada de Estudo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-manuscript-title mb-2 block">
                Assunto/Disciplina
              </label>
              <Input
                placeholder="Ex: Filosofia Aristotélica, Teologia Patrística..."
                value={newEntry.subject}
                onChange={(e) => setNewEntry({...newEntry, subject: e.target.value})}
                className="medieval-border"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-manuscript-title mb-2 block">
                Tipo de Atividade
              </label>
              <select 
                className="w-full p-2 border border-manuscript-accent/30 rounded-md bg-background text-manuscript-text"
                value={newEntry.activity}
                onChange={(e) => setNewEntry({...newEntry, activity: e.target.value})}
              >
                <option value="philosophyReading">Leitura Filosófica</option>
                <option value="scriptureStudy">Estudo das Escrituras</option>
                <option value="latinStudy">Estudo do Latim</option>
                <option value="logicExercises">Exercícios de Lógica</option>
                <option value="metaphysicsReading">Leitura Metafísica</option>
                <option value="weeklySynthesis">Síntese Semanal</option>
                <option value="prayer">Oração Pessoal</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-manuscript-title mb-2 block">
              Conteúdo Estudado
            </label>
            <Textarea
              placeholder="Descreva o que foi estudado, insights obtidos, dificuldades encontradas..."
              value={newEntry.content}
              onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
              className="medieval-border min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleAddEntry}
            variant="divine"
            disabled={!newEntry.subject || !newEntry.content}
            className="w-full"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Registrar Estudo
          </Button>
        </CardContent>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-manuscript-title">Entradas Recentes</h2>
        
        {entries.length === 0 ? (
          <Card className="medieval-border">
            <CardContent className="text-center py-8">
              <BookOpen className="w-12 h-12 text-manuscript-accent mx-auto mb-4" />
              <p className="text-manuscript-text">
                Nenhuma entrada registrada ainda. Comece sua jornada de estudos!
              </p>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} className="medieval-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{entry.subject}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Calendar className="w-3 h-3 mr-1" />
                      {entry.date}
                    </Badge>
                    <Badge variant="secondary">
                      +{entry.pesGained} PES
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-manuscript-text leading-relaxed">
                  {entry.content}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {entry.skillGained}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="text-center text-manuscript-text italic text-sm mt-8 p-4 bg-manuscript-glow/5 rounded-lg border border-divine-light/20">
        "Verba volant, scripta manent" - As palavras voam, os escritos permanecem
      </div>
    </div>
  );
};