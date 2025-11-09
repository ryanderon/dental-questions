// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Card from '../atoms/Card';
import Badge from '../atoms/Badge';

const ScoreCard = ({ score, total, percentage, wrongAnswers }) => {
  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A', color: 'success', message: 'Luar Biasa! 🎉' };
    if (percentage >= 80) return { grade: 'B', color: 'info', message: 'Bagus Sekali! 👏' };
    if (percentage >= 70) return { grade: 'C', color: 'warning', message: 'Cukup Baik! 👍' };
    if (percentage >= 60) return { grade: 'D', color: 'warning', message: 'Perlu Belajar Lagi 📚' };
    return { grade: 'E', color: 'error', message: 'Jangan Menyerah! 💪' };
  };
  
  const gradeInfo = getGrade(percentage);
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: 'spring' }}
    >
      <Card className="text-center mb-6 bg-gradient-to-br from-sky-50 to-blue-50">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-6">
            {gradeInfo.message}
          </h2>
          
          <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
            <div className="text-center">
              <div className="text-6xl font-bold text-sky-600 mb-2">
                {percentage.toFixed(0)}
              </div>
              <p className="text-sm text-sky-500 font-semibold">
                Nilai Akhir
              </p>
            </div>
            
            <div className="w-px h-20 bg-sky-200 hidden sm:block" />
            
            <div className="text-center">
              <Badge variant={gradeInfo.color} className="text-2xl px-6 py-3 mb-2">
                Grade {gradeInfo.grade}
              </Badge>
              <p className="text-sm text-gray-500">
                {score} dari {total} benar
              </p>
            </div>
          </div>
        </motion.div>
      </Card>
      
      {wrongAnswers.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h4 className="text-2xl font-semibold text-red-600 mb-6">
              Jawaban yang Salah ({wrongAnswers.length})
            </h4>
            
            <div className="space-y-4">
              {wrongAnswers.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-5 bg-red-50 rounded-xl border-l-4 border-red-400"
                >
                  <p className="text-sm font-semibold text-red-700 mb-3">
                    Soal #{item.number}
                  </p>
                  <p className="text-base mb-4 text-gray-700 leading-relaxed">
                    {item.question}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="bg-red-100 p-4 rounded-lg">
                      <p className="text-sm text-red-600 font-semibold mb-2">
                        Jawaban Anda:
                      </p>
                      <p className="text-base text-red-800 font-medium">
                        {item.userAnswer || 'Tidak dijawab'}
                      </p>
                    </div>
                    
                    <div className="bg-green-100 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-semibold mb-2">
                        Jawaban Benar:
                      </p>
                      <p className="text-base text-green-800 font-medium">
                        {item.correctAnswer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScoreCard;
