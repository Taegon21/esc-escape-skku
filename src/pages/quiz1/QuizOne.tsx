import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Bg2 from '/src/assets/images/bg/bg2.png';
import Bg3 from '/src/assets/images/bg/bg3.png';
import Ncenter from '/src/assets/images/bg/ncenter.png';
import Avatar2 from '/src/assets/images/avatar/2.png';
import Correct from './Correct';
import Wrong from './Wrong';
import Object from '@/component/answer/Object';
import AvatarBlackChat from '@/component/chatbox/AvatarBlackChat';
import TopBar from '@/component/bar/TopBar';
import Radio from '/src/assets/sound/radio.mp3';
export default function QuizOne() {
  const audioRef = useRef<HTMLAudioElement | null>(null); // 오디오 객체 레퍼런스
  const [isPlaying, setIsPlaying] = useState(1); // 음악 재생 상태
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(0);
  const dialogues = [
    {
      idx: 1,
      props: 5,
      name: '교수님',
      text: '내 연구생이 기숙사를 가서 돌아오지 않는다..',
    },
    {
      idx: 2,
      props: 5,
      name: '교수님',
      text: '거기 우리에게 꼭 필요한 방호복이 있는데...',
    },
    {
      idx: 3,
      props: 5,
      name: '교수님',
      text: '4층에 산다고 했던것 같은데..혹시 어디인지 아는가?',
    },
  ];

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    0
  );

  const [subjectAnswer, setSubjectAnswer] = useState<string | null>('');
  const [isModal, setIsModal] = useState(false); // 처음엔 없음
  const [isStart, setIsStart] = useState(false);
  const answers = ['성', '균', '관', '대'];
  const [idx, setIdx] = useState<number>(1); // Store idx

  const handleSelect = (index: number | null) => {
    setIsModal(false); // 모달 닫기
    setSelectedAnswerIndex(index);
    console.log('Selected answer index:', index);
    if (index == 4) {
      setIsCorrect(1);
    } else {
      setIsCorrect(2);
    }
  };

  const showModal = () => {
    console.log('모달 열기 시도');
    setIsModal(true); //보임
    setSelectedAnswerIndex(null);
    setSubjectAnswer('0');
  };

  const handleNext = (nextIdx: number) => {
    nextIdx++;
    setIdx(nextIdx);
    console.log('Next idx:', nextIdx);
    if (nextIdx > dialogues.length) {
      console.log('finish');
      setIsStart(true);
    }
  };

  const handleRetry = () => {
    console.log('다시');
    window.location.reload();
  };

  const currentDialogue = dialogues.find((dialogue) => dialogue.idx === idx);
  const handleSound = (soundStatus: number) => {
    setIsPlaying(soundStatus);
    if (audioRef.current) {
      if (soundStatus === 1) {
        audioRef.current.play(); // 소리 재생
      } else {
        audioRef.current.pause(); // 소리 일시정지
      }
    }
  };

  // 첫 페이지 로드시 자동으로 소리를 재생
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 볼륨 설정
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          console.log('자동 재생 성공');
        } catch (error) {
          console.log('자동 재생 실패, 사용자가 상호작용해야 함:', error);
        }
      };
      playAudio();
    }
  }, []);
  return (
    <div className=" w-full h-full bg-[#793A1C] relative">
      <TopBar onSound={handleSound} />
      <audio ref={audioRef} src={Radio} loop />
      {isModal && (
        <Object
          q="다음 중, 애드워드 리의 본명은?"
          answer={answers}
          onSelect={handleSelect}
        />
      )}
      <div className="top-0 absolute w-full h-full z-[50]">
        <img src={Bg3} className="h-full w-full" />
      </div>
      {isCorrect === 1 ? (
        <Correct />
      ) : isCorrect === 2 ? (
        <Wrong onRetry={handleRetry} />
      ) : (
        <div className="z-[40]">
          <div className="w-full max-w-[500px] absolute bottom-[250px]">
            <img src={Bg2} />
          </div>
          <div className="w-full max-w-[500px] absolute bottom-[318px]">
            <div className="relative w-1/2 ml-auto">
              <img src={Ncenter} />
            </div>
          </div>

          <div className="p-4 w-full max-w-[500px] absolute bottom-0 h-[300px] bg-[#661AAF]">
            {currentDialogue && (
              <AvatarBlackChat
                idx={currentDialogue.idx}
                props={currentDialogue.props}
                name={currentDialogue.name}
                text={currentDialogue.text}
                handleNext={() => handleNext(idx)}
              />
            )}
          </div>
          <div
            className={`w-full flex ml-20 max-w-[500px] absolute bottom-[300px] z-20 transition-transform duration-[2500ms]`}
          >
            <div className="w-[20%]">
              <img src={Avatar2} />
            </div>
          </div>
          {isStart && (
            <div
              onClick={showModal}
              className="flex justify-center text-[1.2rem] w-full h-[10%] absolute bottom-0 text-white z-[90]"
            >
              문제풀기
            </div>
          )}

          <div className="w-full h-[50%] scrollbar-hide overflow-y-scroll absolute top-[5%] p-4 max-w-[500px] space-y-4"></div>
        </div>
      )}
    </div>
  );
}
