
import { Card } from '@/components/ui/card';
import { Info, Circle, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const AcneGuide = () => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const acneTypes = [
    {
      name: 'Blackheads',
      emoji: '⚫',
      description: 'Open comedones that appear dark due to oxidized sebum and dead skin cells.',
      characteristics: ['Dark or black appearance', 'Open pore', 'Usually painless'],
      tip: 'Use salicylic acid cleansers and avoid over-washing.',
      color: 'border-gray-400',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Whiteheads',
      emoji: '⚪',
      description: 'Closed comedones that appear as small white or flesh-colored bumps.',
      characteristics: ['White or flesh-colored', 'Closed pore', 'Small raised bumps'],
      tip: 'Gentle exfoliation and non-comedogenic moisturizers help.',
      color: 'border-gray-300',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Papules',
      emoji: '🔴',
      description: 'Small, red, inflammatory bumps without pus.',
      characteristics: ['Red colored', 'Solid bumps', 'May be tender to touch'],
      tip: 'Apply ice and use anti-inflammatory treatments.',
      color: 'border-red-400',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Pustules',
      emoji: '🟡',
      description: 'Inflamed lesions containing pus with a red base.',
      characteristics: ['White or yellow center', 'Red base', 'Contains pus'],
      tip: 'Avoid squeezing. Use benzoyl peroxide cream 2.5%.',
      color: 'border-yellow-400',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Nodules',
      emoji: '🟣',
      description: 'Large, painful bumps deep under the skin.',
      characteristics: ['Large size', 'Deep under skin', 'Often painful'],
      tip: 'Consult a dermatologist for professional treatment.',
      color: 'border-purple-400',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <Card className="p-6 bg-white shadow-lg border-0 rounded-xl h-fit animate-fade-in">
      <div className="flex items-center mb-6">
        <Info className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">Learn About Acne Types</h2>
      </div>
      
      <div className="space-y-3">
        {acneTypes.map((type, index) => (
          <Collapsible key={index} open={openSections[index]} onOpenChange={() => toggleSection(index)}>
            <CollapsibleTrigger
              className={`w-full border-l-4 ${type.color} ${type.bgColor} p-4 rounded-r-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{type.emoji}</span>
                  <h3 className="font-semibold text-lg text-gray-800 text-left">
                    {type.name}
                  </h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openSections[index] ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="animate-accordion-down">
              <div className={`${type.bgColor} p-4 ml-4 rounded-b-lg border-l-4 ${type.color}`}>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {type.description}
                </p>
                
                <div className="space-y-2 mb-3">
                  {type.characteristics.map((char, charIndex) => (
                    <div key={charIndex} className="flex items-center text-sm text-gray-600">
                      <Circle className="w-2 h-2 fill-current text-blue-500 mr-2" />
                      {char}
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> {type.tip}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
          <span className="mr-2">📋</span>
          General Treatment Recommendations
        </h4>
        <ul className="text-sm text-blue-800 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">🔸</span>
            Consult a dermatologist for proper diagnosis
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔸</span>
            Maintain a consistent, gentle skincare routine
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔸</span>
            Avoid picking or squeezing acne lesions
          </li>
          <li className="flex items-start">
            <span className="mr-2">🔸</span>
            Use non-comedogenic products
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default AcneGuide;
