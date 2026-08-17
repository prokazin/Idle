import Decimal from 'break_eternity.js'
import { Contract } from '../types/game.types'

const contractTemplates = [
  { title: 'Написать API', description: 'Создай REST API для блога', difficulty: 'easy' as const, baseRequirement: 1000, baseReward: 500 },
  { title: 'Оптимизировать БД', description: 'Улучши запросы к базе данных', difficulty: 'medium' as const, baseRequirement: 5000, baseReward: 2000 },
  { title: 'Разработать микросервис', description: 'Создай микросервис на Go', difficulty: 'hard' as const, baseRequirement: 25000, baseReward: 10000 },
  { title: 'Архитектура Big Data', description: 'Спроектируй систему обработки данных', difficulty: 'expert' as const, baseRequirement: 100000, baseReward: 50000 },
  { title: 'Frontend приложение', description: 'Сделай SPA на React', difficulty: 'easy' as const, baseRequirement: 2000, baseReward: 800 },
  { title: 'Блокчейн смарт-контракт', description: 'Напиши контракт на Solidity', difficulty: 'hard' as const, baseRequirement: 30000, baseReward: 15000 },
  { title: 'DevOps CI/CD', description: 'Настрой пайплайн в GitLab', difficulty: 'medium' as const, baseRequirement: 8000, baseReward: 3000 },
  { title: 'AI модель', description: 'Обучи нейросеть на своих данных', difficulty: 'expert' as const, baseRequirement: 200000, baseReward: 100000 }
]

export const generateContracts = (): Contract[] => {
  const shuffled = [...contractTemplates].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 3).map((template, index) => {
    const difficultyMultiplier = {
      easy: 1,
      medium: 2,
      hard: 4,
      expert: 8
    }
    const multiplier = difficultyMultiplier[template.difficulty]
    const requirement = new Decimal(template.baseRequirement).times(multiplier)
    const reward = new Decimal(template.baseReward).times(multiplier)
    
    return {
      id: `contract-${Date.now()}-${index}`,
      title: template.title,
      description: template.description,
      difficulty: template.difficulty,
      requirement,
      reward,
      timeLimit: 60 * (multiplier * 2),
      progress: new Decimal(0),
      completed: false,
      expired: false
    }
  })
  
  return selected
}
