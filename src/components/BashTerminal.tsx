import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface TerminalLine {
  id: number;
  command: string | null;
  output: React.ReactNode;
}

const PROMPT = 'slash ~ $';

const BANNER = (
  <>
    <span className="bash-term__accent">SLASH.OS</span> 2.0 — secure shell (simulation)
    <br />
    Type <span className="bash-term__accent">help</span> to list commands. No real shell, no real
    consequences.
  </>
);

const NEOFETCH = (
  <div className="bash-term__neofetch">
    <pre className="bash-term__ascii" aria-hidden="true">{`   ____  __    ___   _____ __  __
  / __/ / /   / _ | / ___// / / /
 _\\ \\ / /__ / __ |/ /__ / /_/ /
/___//____//_/ |_|\\___/ \\____/`}</pre>
    <div className="bash-term__neofetch-meta">
      <span><b>OS</b> SLASH.OS 2.0</span>
      <span><b>Host</b> slashstr1ker.github.io</span>
      <span><b>Shell</b> bash (pretend)</span>
      <span><b>Role</b> developer / creator</span>
      <span><b>Stack</b> TypeScript · React · Node.js</span>
      <span><b>Status</b> online</span>
    </div>
  </div>
);

const SL_TRAIN = (
  <pre className="bash-term__train" aria-hidden="true">{`      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|  _________________
   /     |  |   H  |  |     |   |         ||_| |_|| _|               \\_____A
  |      |  |   H  |__--------------------| [___] |                        |
  | ________|___H__/__|_____/[][]~\\_______|       |                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____   _____ ___________
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|___|____________/_____
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/`}</pre>
);

export const BashTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, command: null, output: BANNER },
    {
      id: 1,
      command: 'whoami',
      output: (
        <>
          <span className="bash-term__ok">slashstr1ker</span>
          <br />
          creator · developer · community builder · professional rock miner
        </>
      ),
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lineIdRef = useRef(2);
  const commandCountRef = useRef(0);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, matrix]);

  const pushLines = (command: string, output: React.ReactNode) => {
    setLines((prev) => [
      ...prev,
      { id: lineIdRef.current++, command, output },
    ]);
  };

  const go = (route: string) => {
    window.location.hash = route;
  };

  const runCommand = (raw: string) => {
    const command = raw.trim();
    if (!command) return;
    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    commandCountRef.current += 1;

    const [name, ...args] = command.split(/\s+/);
    const arg = args.join(' ');
    const lower = name.toLowerCase();

    if (lower === 'clear') {
      setLines([]);
      setMatrix(false);
      return;
    }

    switch (lower) {
      case 'help':
        pushLines(
          command,
          <>
            <span className="bash-term__muted">available commands</span>
            <div className="bash-term__cmd-grid">
              <span><b>whoami</b> who is behind the screen</span>
              <span><b>about</b> short biography</span>
              <span><b>ls</b> list the site sectors</span>
              <span><b>open &lt;sector&gt;</b> jump to a page</span>
              <span><b>projects</b> list featured work</span>
              <span><b>skills</b> print the toolbox</span>
              <span><b>neofetch</b> system + identity</span>
              <span><b>social</b> useful links</span>
              <span><b>date / uname</b> the basics</span>
              <span><b>echo &lt;text&gt;</b> say it back</span>
              <span><b>matrix</b> follow the white rabbit</span>
              <span><b>sl</b> a classic mistake</span>
              <span><b>sudo</b> nice try</span>
              <span><b>clear</b> clean the screen</span>
            </div>
            <span className="bash-term__muted">
              There may be one or two commands that are not listed.
            </span>
          </>
        );
        break;
      case 'whoami':
        pushLines(
          command,
          <>
            <span className="bash-term__ok">slashstr1ker</span>
            <br />
            creator · developer · community builder · professional rock miner
          </>
        );
        break;
      case 'about':
        pushLines(command, SITE_CONFIG.aboutPage.intro);
        break;
      case 'pwd':
        pushLines(command, '/home/slash');
        break;
      case 'ls':
      case 'dir':
        pushLines(
          command,
          <div className="bash-term__ls">
            <span>about/</span>
            <span>portfolio/</span>
            <span>youtube/</span>
            <span>netquel/</span>
            <span>minecraft/</span>
            <span>bots/</span>
            <span>game/</span>
            <span>contact/</span>
            <span className="bash-term__dim">.secret/</span>
          </div>
        );
        break;
      case 'cat':
        if (!arg) {
          pushLines(command, 'cat: missing file operand — try `ls`');
        } else if (arg === '.secret' || arg === '.secret/' || arg === 'secret') {
          pushLines(
            command,
            <>
              <span className="bash-term__warn">permission denied.</span> But curiosity is a
              good sign. <button type="button" className="bash-term__inline-link" onClick={() => go('#/secret')}>trace the signal →</button>
            </>
          );
        } else {
          pushLines(
            command,
            `cat: ${arg}: no such file. This terminal only pretends to have a filesystem.`
          );
        }
        break;
      case 'open':
        if (arg) {
          const route = arg.replace(/^#?\/?/, '').toLowerCase();
          go(route ? `#/${route}` : '#/');
          pushLines(command, `opening sector /${route || ''}…`);
        } else {
          pushLines(command, 'usage: open <about|portfolio|youtube|netquel|minecraft|bots|game|contact>');
        }
        break;
      case 'projects':
        pushLines(
          command,
          <ul className="bash-term__list">
            {SITE_CONFIG.portfolio.projects.map((project) => (
              <li key={project.id}>
                <span className="bash-term__ok">{project.title}</span> — {project.category}
              </li>
            ))}
          </ul>
        );
        break;
      case 'skills':
        pushLines(
          command,
          <ul className="bash-term__list">
            {SITE_CONFIG.portfolio.skills.map((group) => (
              <li key={group.category}>
                <span className="bash-term__ok">{group.category}:</span> {group.items.join(' · ')}
              </li>
            ))}
          </ul>
        );
        break;
      case 'neofetch':
        pushLines(command, NEOFETCH);
        break;
      case 'social':
        pushLines(
          command,
          <div className="bash-term__ls">
            <a href={SITE_CONFIG.links.youtubeChannel} target="_blank" rel="noopener noreferrer">YouTube ↗</a>
            <a href={SITE_CONFIG.links.slashStr1kerDiscord} target="_blank" rel="noopener noreferrer">Discord ↗</a>
            <a href={SITE_CONFIG.netquel.playUrl} target="_blank" rel="noopener noreferrer">Netquel ↗</a>
            <span>Discord handle: {SITE_CONFIG.contact.discordUsername}</span>
          </div>
        );
        break;
      case 'date':
        pushLines(command, new Date().toString());
        break;
      case 'uname':
        pushLines(command, 'SLASH.OS slashstr1ker 2.0 creative amd64 (pretend)');
        break;
      case 'echo':
        pushLines(command, arg || '');
        break;
      case 'sudo':
        pushLines(
          command,
          <>
            <span className="bash-term__warn">nice try.</span> This incident has been logged,
            printed, framed, and hung in the community server.
          </>
        );
        break;
      case 'rm':
        pushLines(
          command,
          <>
            <span className="bash-term__warn">rm:</span> operation not permitted. You are not
            deleting the website today. Try `sudo rm -rf /` if you enjoy disappointment.
          </>
        );
        break;
      case 'sl':
        pushLines(command, SL_TRAIN);
        break;
      case 'matrix':
        setMatrix(true);
        window.dispatchEvent(new CustomEvent('ss-easter-egg', { detail: 'matrix' }));
        pushLines(
          command,
          <>
            <span className="bash-term__matrix">Wake up, slash…</span> follow the falling
            characters. There is no spoon, but there is a hidden page: <span className="bash-term__ok">#/secret</span>
          </>
        );
        break;
      case 'exit':
      case 'logout':
        pushLines(command, 'There is no exit. Only more projects.');
        break;
      case 'uno':
        pushLines(
          command,
          <>
            <span className="bash-term__warn">UNO!</span> +4 cards, colour changed to neon cyan.
            The bot is not impressed. Try <span className="bash-term__ok">/uno-play</span> in
            Discord.
          </>
        );
        break;
      case 'achievements':
      case 'trophy':
        pushLines(
          command,
          <>
            Achievements live in the Space Mine game. Launch a rig, mine some rocks, and the
            log fills up. <button type="button" className="bash-term__inline-link" onClick={() => go('#/game')}>open Space Mine →</button>
          </>
        );
        break;
      case 'coords':
        pushLines(command, 'X 09.41 // Y 12.07 // SECTOR 01 // SIGNAL STABLE');
        break;
      case 'konami':
        pushLines(
          command,
          'Try the real thing on any page: ↑ ↑ ↓ ↓ ← → ← → B A. The old ways still work.'
        );
        break;
      case 'xyzzy':
        pushLines(command, 'Nothing happens. (That is the easter egg.)');
        break;
      case 'history':
        pushLines(command, history.length ? history.join('  ') : 'no history yet');
        break;
      default:
        pushLines(
          command,
          <>
            bash: {name}: command not found
            <br />
            <span className="bash-term__muted">Try `help` — or `open portfolio` if you are here to hire me.</span>
          </>
        );
    }

    if (commandCountRef.current === 7) {
      window.dispatchEvent(new CustomEvent('ss-easter-egg', { detail: 'terminal' }));
    }
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runCommand(input);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] || '');
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] || '');
      }
    }
  };

  return (
    <div className={`bash-term ${matrix ? 'is-matrix' : ''}`}>
      <div className="bash-term__titlebar">
        <span className="bash-term__title">
          <Terminal size={14} aria-hidden="true" />
          slash@dev — bash
        </span>
        <span className="bash-term__meta" aria-hidden="true">
          <span>80×24</span>
          <span className="bash-term__lights">
            <i className="is-red" />
            <i className="is-yellow" />
            <i className="is-green" />
          </span>
        </span>
      </div>

      <div className="bash-term__body" ref={bodyRef}>
        {matrix && <div className="bash-term__matrix-rain" aria-hidden="true" />}
        {lines.map((line) => (
          <div key={line.id} className="bash-term__block">
            {line.command !== null && (
              <div className="bash-term__command">
                <span className="bash-term__user">slash@dev</span>
                <span className="bash-term__path">~</span>
                <span className="bash-term__prompt">{PROMPT}</span>
                <span>{line.command}</span>
              </div>
            )}
            <div className="bash-term__output">{line.output}</div>
          </div>
        ))}

        <form
          className="bash-term__form"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(input);
          }}
        >
          <label htmlFor="bash-terminal-input" className="bash-term__user">
            slash@dev
          </label>
          <span className="bash-term__path">~</span>
          <span className="bash-term__prompt">{PROMPT}</span>
          <input
            id="bash-terminal-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            className="bash-term__input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Fake bash terminal input"
            placeholder="whoami"
          />
        </form>
      </div>
    </div>
  );
};
