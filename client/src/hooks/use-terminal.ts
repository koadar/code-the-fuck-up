import { useState, useEffect, useCallback } from 'react';

type Command = {
  name: string;
  handler: (args: string[]) => string;
  description: string;
};

export function useTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      handler: () => {
        return `
          Available commands:
          - help: Show this help message
          - roast-guru [name]: Roast a tech influencer
          - rant: Get a random dev rant
          - fuckup: Get a random dev fuckup story
          - clear: Clear the terminal
          - exit: Close the terminal
        `;
      },
      description: 'Show available commands'
    },
    'roast-guru': {
      name: 'roast-guru',
      handler: (args) => {
        const name = args[0] || '';
        const roasts = [
          `${name || 'That influencer'} hasn't written a line of production code since 2015, but has 47 courses on "mastering" technologies they've never used.`,
          `${name || 'That guru'} once deployed to production on a Friday and blamed the junior dev for the weekend crisis.`,
          `${name || 'That tech bro'} claims to have "revolutionized" software architecture by renaming MVC to CVM and charging $899 for the course.`,
          `${name || 'That thought leader'} has more LinkedIn posts about productivity than actual code commits in their entire career.`
        ];
        return roasts[Math.floor(Math.random() * roasts.length)];
      },
      description: 'Roast a tech influencer'
    },
    rant: {
      name: 'rant',
      handler: () => {
        const rants = [
          "DOCKER ISN'T A PERSONALITY. Just because you can containerize a Hello World app doesn't make you a DevOps engineer. Stop putting it on your dating profile.",
          "AGILE IS JUST MICROMANAGEMENT WITH BETTER MARKETING. Change my mind.",
          "YOUR BITCOIN OPINIONS ARE WORTHLESS - literally now that your portfolio is down 70%. Please stop explaining blockchain to me at lunch.",
          "I DON'T CARE ABOUT YOUR MECHANICAL KEYBOARD. We all know it's just to distract from your mediocre code. And yes, we can hear you typing from three floors away."
        ];
        return rants[Math.floor(Math.random() * rants.length)];
      },
      description: 'Get a random dev rant'
    },
    fuckup: {
      name: 'fuckup',
      handler: () => {
        const fuckups = [
          "Pushed API keys to public GitHub repo. Woke up to $17,000 AWS bill. Company now uses AWS Educate free tier.",
          "Accidentally deployed to production instead of staging during a demo with the CEO. Site went down. So did my career trajectory.",
          "Dropped the production database while trying to back it up. Recovery plan was also stored in that database.",
          "Left a console.log('This shit is fucked') in production code. It appeared in the client's executive dashboard during their investor presentation."
        ];
        return fuckups[Math.floor(Math.random() * fuckups.length)];
      },
      description: 'Get a random dev fuckup story'
    },
    clear: {
      name: 'clear',
      handler: () => {
        setOutput([]);
        return '';
      },
      description: 'Clear the terminal output'
    },
    exit: {
      name: 'exit',
      handler: () => {
        setIsOpen(false);
        return '';
      },
      description: 'Close the terminal'
    }
  };
  
  const processCommand = useCallback((input: string) => {
    const parts = input.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    setOutput(prev => [...prev, `$ ${input}`]);
    
    if (command === '') {
      return;
    }
    
    if (commands[command]) {
      const result = commands[command].handler(args);
      if (result) {
        setOutput(prev => [...prev, result]);
      }
    } else {
      setOutput(prev => [...prev, `Command not found: ${command}. Type 'help' for available commands.`]);
    }
    
    setInputValue('');
  }, [commands]);
  
  const toggleTerminal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Alt + t to toggle terminal
      if (e.altKey && e.key === 't') {
        toggleTerminal();
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [toggleTerminal]);
  
  return {
    isOpen,
    output,
    inputValue,
    setInputValue,
    processCommand,
    toggleTerminal
  };
}
