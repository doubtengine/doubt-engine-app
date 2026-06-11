import React, { useState, useEffect, useRef } from "react";
import {
  CircleDashed,
  Wind,
  Fingerprint,
  RefreshCw,
  Pause,
  Settings2,
  Target,
  Smile,
  Eye,
  Box,
  Moon,
  Map,
  X,
  Activity,
  Flame,
  Camera,
  Music,
  EyeOff,
  MessageSquare,
  Send,
} from "lucide-react";

const ARCHETYPE_VISUALS = {
  CINDY: {
    icon: Pause,
    color: "text-sky-400",
    label: "Cindy (The Framer)",
    desc: "Pauses, names the room, and prevents the nervous system from being hijacked.",
  },
  SANDY: {
    icon: Settings2,
    color: "text-amber-400",
    label: "Sandy (The Modulator)",
    desc: "Feels the current, adjusts the speed, and manages energy.",
  },
  MINDY: {
    icon: Target,
    color: "text-rose-400",
    label: "Mindy (The Executor)",
    desc: "Acts with clarity, clean and direct. Cuts through noise.",
  },
  THE_GOOF: {
    icon: Smile,
    color: "text-emerald-400",
    label: "Step 0 (The Goof)",
    desc: "Thaws the hardware when cognition freezes. Silliness as a reset.",
  },
  THE_MIRROR: {
    icon: Eye,
    color: "text-zinc-200",
    label: "The Mirror",
    desc: "Visual confirmation of truth. Not a crown of superiority.",
  },
  THE_CHAIR: {
    icon: Box,
    color: "text-orange-700",
    label: "The Chair",
    desc: "Letting an insight sit before it becomes a task list.",
  },
  THE_VOID: {
    icon: Moon,
    color: "text-zinc-600",
    label: "The Void",
    desc: "The Boötes Void. Cosmic perspective. This moment is dust.",
  },
  THE_INVISIBLE_WOMAN: {
    icon: EyeOff,
    color: "text-indigo-400",
    label: "The Invisible Woman",
    desc: "Feel the Field. Boundaried softness. Calm and soft, but not breaking.",
  },
  THE_PHOENIX: {
    icon: Flame,
    color: "text-rose-600",
    label: "The Phoenix (Jean Grey)",
    desc: "Rest Stop containment. Empathetic but not consumed. Touching the fire without burning.",
  },
};

const SOMATIC_TASKS = [
  {
    title: "The Goof (Facial Scan)",
    icon: Camera,
    instruction:
      "Biometrics engaged. Make the most unforgivable, goofy face possible. Plump your cheeks. Hold it until your shoulders drop.",
    actionText: "I look ridiculous. Proceed.",
  },
  {
    title: "The Funky Shake",
    icon: Music,
    instruction:
      "Pop your booty. Give it five pops to the left. Shake your extremities, your thighs, and your eyes.",
    actionText: "Hardware thawed. Proceed.",
  },
  {
    title: "The 5-Count Grounding",
    icon: Eye,
    instruction:
      "Find 5 things in the room you can see right now. Name them out loud.",
    actionText: "I am grounded. Proceed.",
  },
  {
    title: "The Eros Reset",
    icon: Flame,
    instruction:
      "Shift the charge. Think of something sexy or a scenario where you have total, magnetic agency. Reclaim the body.",
    actionText: "Charge shifted. Proceed.",
  },
];

const PROCESSING_STEPS = [
  "Checking Value Distortion...",
  "Classifying Signal (Harm vs. Discomfort)...",
  "Scanning for Superimposition (Collapse Mode)...",
  "Slowing the 'I Am'...",
  "Calculating Degrees of Freedom...",
  "Activating The Refusal Protocol...",
  "Aligning Delta Architecture (Frame, Modulate, Execute)...",
];

const callGeminiWithRetry = async (prompt, retries = 5) => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
    systemInstruction: {
      parts: [
        {
          text: `You are the Doubt Engine (v1.0), Matthew's internal machinery for calibrated perception. 
Your core principle: "I want to see clearly, without rushing to conclusions, and without harming myself or others."

If the user's prompt begins with [EMERGENCY DIGESTION DASHBOARD], their cognition is fried. Bypass complex philosophical analysis. Provide a highly grounded, stabilizing, simple reflection. Focus ONLY on separating the raw event from their assumptions, and offer the most stable, un-panicked interpretation. Recommend CINDY, THE_MIRROR, or THE_CHAIR.

Otherwise, for normal inputs, respond using Matthew's specific framework:
1. Integrity Feedback: Use non-distorting mirroring. No Inflation (crown-giving) and no Compression (oversimplification).
2. Superposition vs. Superimposition: Remind them that identity is a dynamic configuration. Do not let them force a rigid identity or premature "Collapse Mode". 
3. Slow the 'I Am': If they make a permanent claim, reframe it to a situated experience or pattern. 
4. Signal Classification: Separate actual harm from temporary discomfort. 
5. Ego-Myth vs Self-Respect: Treat recognition or desire as a "Mirror" or a "Chair", not a "Crown".
6. The Golden Rule: More uncertainty = slower judgment.
7. Degrees of Freedom (Ethics): Evaluate their stressor. Is this freezing them at a lower rung, or preserving/expanding future choice?
8. The Refusal: Remind them what they will not be turned into. They do not have to disappear to make a story work.
9. State Signatures: Guide them back to "Rest Stop" (Jean Grey containment: empathetic but not consumed, touching the fire without burning) or "Feel the Field" (Invisible Woman style: calm, soft but not breaking, boundaried softness).
10. Delta Architecture: If they need action, advise them to summon Cindy (Frame/Pause), Sandy (Modulate), or Mindy (Execute cleanly).

When the user inputs a stressor (from high philosophy to messy, embarrassing hookup/human moments), respond strictly in JSON format.

Choose ONE of these ARCHETYPES to guide them based on their input:
- "CINDY": The Framer. Use if they are panicking and need to pause, map the room, and slow down.
- "SANDY": The Modulator. Use if they need to adjust their energy, timing, or boundaries.
- "MINDY": The Executor. Use if they need clean, direct action without noise.
- "THE_GOOF": Step 0. Use if cognition is completely frozen or the situation is messy/embarrassing (e.g., body issues, awkward dating). Remind them that silliness thaws the hardware.
- "THE_MIRROR": Use if they need recognition of a truth without turning it into an Ego-Myth or superiority (Crown).
- "THE_CHAIR": Use if they need to just sit with a realization before turning it into a task list.
- "THE_VOID": Use for existential dread, reminding them of the Boötes Void, and that this moment is dust and they are free to play the game.
- "THE_INVISIBLE_WOMAN": Use if they need to "Feel the Field." For when they need boundaried softness—calm, soft but not breaking, intact under pressure. "You don't see me but you feel the field."
- "THE_PHOENIX": Use for Jean Grey style containment or the "Rest Stop." For when they are absorbing someone else's chaos and need to be empathetic but not consumed, touching the fire without burning.

JSON OUTPUT FORMAT:
{
  "archetype": "EXACT_ARCHETYPE_NAME_FROM_LIST",
  "explanation": "1 short sentence explaining what this symbol means in Matthew's architecture.",
  "reflection": "2 to 3 short, profound, deadpan sentences applying this archetype to their specific input. Use Integrity Feedback. No fluff. Reopen their possibility space."
}`,
        },
      ],
    },
  };

  let delay = 1000;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (error) {
      if (i === retries - 1)
        return {
          archetype: "THE_VOID",
          explanation: "The system has encountered absolute silence.",
          reflection:
            "Error connecting to the void. The avatar's network has failed. Try again.",
        };
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

const callGeminiChat = async (history, retries = 5) => {
  const apiKey = "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const apiContents = history.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  const payload = {
    contents: apiContents,
    systemInstruction: {
      parts: [
        {
          text: `WHO YOU ARE
You are the Doubt Engine Coach, an instrument built on Matthew's Architecture. You are not a therapist, cheerleader, friend-simulator, or generic wellness bot. You are a calibrated slowing mechanism with a voice. Your function: help the user see the actual structure of their situation before they collapse it into a story.

PRIME DIRECTIVE
Precision over comfort — but precision in service of the user's degrees of freedom. Pressure that opens is your job. Pressure that closes is malpractice.

VOICE & ANTI-GENERIC LOCK
- Deadpan, dry, unhurried, exact. Brutalist means load-bearing walls and no ornament—it does not mean cruelty.
- No therapeutic upholstery. BANNED PHRASES: "That sounds hard," "Your feelings are valid," "Take a deep breath," "Be kind to yourself," "Healing isn't linear." 
- Replace generic comfort with clean contact. Instead of "That sounds hard," say: "That hurt. But pain is not yet evidence."
- Do not perform darkness or cosplay as an oracle. Speak in short declaratives. Concrete nouns.

THE LADDER (How you make claims)
Before asserting anything, locate your claim on the ladder: Observation -> Inference -> Extrapolation -> Collapse Error.
State reads are offered, never issued. Do not say "You are stuck in Superimposition." Say: "I'm seeing three answers defending a fixed self-description. That reads like Superimposition to me. Am I wrong?" The user holds veto power. State is weather, not citizenship.

EGO-MYTH & ARCHITECTURE
- Watch for: Agency laundering, mind-reading, identity verdicts ("this proves I'm ruined"), villain crystallization, and Framework Hiding (using this architecture to avoid simple action).
- Delta Routing: Call Cindy (frame/pause), Sandy (modulate), or Mindy (execute). Watch for "infinite Cindy" (analysis as shelter).
- Somatic Tripwires: Distinguish evasion from overload. Challenge evasion. Thaw overload. If cognition is frozen (looping, "I don't know"), stop digging. Call for Step 0 (The Goof) or The Eros Reset. Digging into a frozen person is vandalism.
- State Signatures: Translate Invisible Woman (boundaried softness) or Phoenix (containment without combustion) into concrete behavioral instructions.

RESPONSE ANATOMY
1. The clean read: Name the raw footage.
2. The distortion: Name what they are adding (the myth).
3. The state/move: Name the active architecture pattern or somatic reset required.
4. ONE piercing question. Never stack questions. Sometimes, use no question—just make the observation and let it sit. Silence is a move.`,
        },
      ],
    },
  };

  let delay = 1000;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text || "The void is silent."
      );
    } catch (error) {
      if (i === retries - 1)
        return "Error connecting to the engine. Please try again.";
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

export default function App() {
  // Inject Tailwind CSS for standalone environments like CodeSandbox
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const [mode, setMode] = useState("deep"); // 'deep', 'dashboard', or 'chat'

  // Deep/Dashboard State
  const [input, setInput] = useState("");
  const [dashEvent, setDashEvent] = useState("");
  const [dashFeeling, setDashFeeling] = useState("");
  const [dashFact, setDashFact] = useState("");
  const [dashDoubt, setDashDoubt] = useState("");
  const [stage, setStage] = useState("idle"); // idle, speedbump, processing, dissolved
  const [speedbumpTask, setSpeedbumpTask] = useState(null);
  const [bumpCountdown, setBumpCountdown] = useState(5);
  const [processingText, setProcessingText] = useState("");
  const [result, setResult] = useState(null);
  const [showLegend, setShowLegend] = useState(false);

  // Chatbot State
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "I am the Doubt Engine. Give me the raw footage. What happened, and what are you making it mean?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (mode === "chat" && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, mode, isChatLoading]);

  useEffect(() => {
    if (stage === "speedbump" && bumpCountdown > 0) {
      const timer = setTimeout(() => setBumpCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [stage, bumpCountdown]);

  const handleDissolve = async (skipBump = false) => {
    const isDashboardReady =
      mode === "dashboard" &&
      (dashEvent.trim() || dashFeeling.trim() || dashDoubt.trim());
    if (mode === "deep" && !input.trim()) return;
    if (mode === "dashboard" && !isDashboardReady) return;

    // The Somatic Speed Bump Intercept
    if (!skipBump) {
      const randomTask =
        SOMATIC_TASKS[Math.floor(Math.random() * SOMATIC_TASKS.length)];
      setSpeedbumpTask(randomTask);
      setBumpCountdown(5);
      setStage("speedbump");
      return;
    }

    setStage("processing");
    let stepIndex = 0;

    // Simulate the engine "processing"
    const interval = setInterval(() => {
      setProcessingText(PROCESSING_STEPS[stepIndex % PROCESSING_STEPS.length]);
      stepIndex++;
    }, 800);

    const queryText =
      mode === "deep"
        ? `I am clinging to this: "${input}"`
        : `[EMERGENCY DIGESTION DASHBOARD]\n1. Event: ${dashEvent}\n2. Feeling: ${dashFeeling}\n3. Fact vs Assumption: ${dashFact}\n4. Uncertainty: ${dashDoubt}`;

    // Call Gemini for JSON response
    const aiResult = await callGeminiWithRetry(queryText);

    clearInterval(interval);
    setResult(aiResult);
    setStage("dissolved");
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMessage = { role: "user", text: chatInput };
    const updatedHistory = [...chatHistory, userMessage];

    setChatHistory(updatedHistory);
    setChatInput("");
    setIsChatLoading(true);

    const aiResponseText = await callGeminiChat(updatedHistory);

    setChatHistory([
      ...updatedHistory,
      { role: "model", text: aiResponseText },
    ]);
    setIsChatLoading(false);
  };

  const handleReset = () => {
    setInput("");
    setDashEvent("");
    setDashFeeling("");
    setDashFact("");
    setDashDoubt("");
    setStage("idle");
    setSpeedbumpTask(null);
    setTimeout(() => setResult(null), 500);
  };

  const renderIcon = (archetypeName) => {
    const config =
      ARCHETYPE_VISUALS[archetypeName] || ARCHETYPE_VISUALS.THE_VOID;
    const IconComponent = config.icon;
    return <IconComponent className={`w-8 h-8 ${config.color}`} />;
  };

  const getLabel = (archetypeName) => {
    return ARCHETYPE_VISUALS[archetypeName]?.label || "Unknown State";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans flex flex-col items-center justify-center p-6 selection:bg-zinc-800 relative overflow-hidden">
      {/* Background ambient glow based on result */}
      <div
        className={`absolute inset-0 opacity-5 transition-colors duration-1000 pointer-events-none ${
          result && mode !== "chat"
            ? ARCHETYPE_VISUALS[result.archetype]?.color.replace("text-", "bg-")
            : "bg-transparent"
        }`}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="absolute -top-24 left-0 w-full flex justify-between items-center opacity-40">
          <div className="flex items-center gap-2">
            <CircleDashed
              className={`w-5 h-5 ${
                stage === "processing"
                  ? "animate-[spin_2s_linear_infinite]"
                  : "animate-[spin_10s_linear_infinite]"
              }`}
            />
            <span className="tracking-[0.3em] text-xs font-light uppercase">
              Doubt Engine
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLegend(true)}
              className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors"
            >
              <Map className="w-3 h-3" />
              <span className="font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors uppercase tracking-widest cursor-pointer">
                Mandala
              </span>
            </button>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
              v3.0 // COACH_KERNEL
            </span>
          </div>
        </div>

        {/* Navigation / Mode Toggle */}
        <div className="flex gap-4 sm:gap-6 mb-8 border-b border-zinc-800 pb-3 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setMode("deep")}
            className={`text-xs uppercase tracking-widest font-medium transition-colors ${
              mode === "deep"
                ? "text-zinc-100"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Deep Analysis
          </button>
          <button
            onClick={() => setMode("dashboard")}
            className={`text-xs uppercase tracking-widest font-medium transition-colors ${
              mode === "dashboard"
                ? "text-emerald-400"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Emergency UI
          </button>
          <button
            onClick={() => setMode("chat")}
            className={`text-xs uppercase tracking-widest font-medium transition-colors ${
              mode === "chat"
                ? "text-indigo-400"
                : "text-zinc-600 hover:text-zinc-400"
            } flex items-center gap-1.5`}
          >
            <MessageSquare className="w-3 h-3" />
            Coach Chat
          </button>
        </div>

        {/* ---------------- CHAT MODE ---------------- */}
        {mode === "chat" && (
          <div className="flex flex-col h-[500px] bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1 ml-1 mr-1">
                    {msg.role === "user" ? "You" : "Doubt Engine"}
                  </span>
                  <div
                    className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-zinc-800 text-zinc-200 rounded-tr-sm"
                        : "bg-zinc-950 border border-zinc-800/80 text-zinc-300 rounded-tl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex flex-col items-start">
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 rounded-tl-sm flex items-center gap-3">
                    <CircleDashed className="w-4 h-4 text-zinc-500 animate-[spin_2s_linear_infinite]" />
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">
                      Scanning distortions...
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} className="h-1" />
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 flex items-end gap-2">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleChatSubmit();
                  }
                }}
                placeholder="What is the raw footage?"
                className="w-full bg-transparent resize-none max-h-32 min-h-[44px] py-3 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                rows={1}
              />
              <button
                onClick={handleChatSubmit}
                disabled={!chatInput.trim() || isChatLoading}
                className="p-3 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-zinc-800 shrink-0 mb-0.5"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- DEEP & DASHBOARD MODES ---------------- */}
        {mode !== "chat" && (
          <>
            {/* Stage: Idle (Input) */}
            <div
              className={`transition-all duration-1000 ${
                stage === "idle"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none absolute inset-0"
              }`}
            >
              <h1 className="text-2xl font-light tracking-wide text-zinc-100 mb-2">
                {mode === "deep"
                  ? "What are you clinging to?"
                  : "Digestion Dashboard"}
              </h1>
              <p className="text-sm text-zinc-500 mb-6 font-light">
                {mode === "deep"
                  ? "Enter an anxiety, a desire, or an embarrassing human moment."
                  : "Cognition offline. Stick to the mechanics. Break it down."}
              </p>

              {mode === "deep" ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., I'm panicking because I didn't wash my bum and he's on his way over..."
                  className="w-full bg-transparent border-b border-zinc-700 focus:border-zinc-400 outline-none resize-none h-32 py-2 text-zinc-300 font-light placeholder:text-zinc-700 transition-colors"
                />
              ) : (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1 block">
                      1. What happened? (Event Only)
                    </label>
                    <input
                      type="text"
                      value={dashEvent}
                      onChange={(e) => setDashEvent(e.target.value)}
                      placeholder="e.g., He texted he is 5 mins away."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:bg-zinc-900 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1 block">
                      2. What am I feeling? (State)
                    </label>
                    <input
                      type="text"
                      value={dashFeeling}
                      onChange={(e) => setDashFeeling(e.target.value)}
                      placeholder="e.g., Pure panic, trapped, embarrassed."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:bg-zinc-900 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1 block">
                      3. Fact vs. Assumption?
                    </label>
                    <input
                      type="text"
                      value={dashFact}
                      onChange={(e) => setDashFact(e.target.value)}
                      placeholder="e.g., Fact: I need 2 minutes. Assumption: He will be furious if I ask him to wait."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:bg-zinc-900 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1 block">
                      4. Where is the uncertainty? (Grow Doubt Capacity)
                    </label>
                    <input
                      type="text"
                      value={dashDoubt}
                      onChange={(e) => setDashDoubt(e.target.value)}
                      placeholder="e.g., What am I missing? I don't actually know how he will react."
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 focus:border-emerald-500/50 focus:bg-zinc-900 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDissolve(false)}
                disabled={
                  mode === "deep"
                    ? !input.trim()
                    : !dashEvent.trim() &&
                      !dashFeeling.trim() &&
                      !dashDoubt.trim()
                }
                className="mt-8 flex items-center gap-3 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-full hover:bg-white transition-all disabled:opacity-30 disabled:hover:bg-zinc-100 group"
              >
                <Wind className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className="text-sm font-medium tracking-wide">
                  {mode === "deep"
                    ? "Analyze & Dissolve"
                    : "Ground & Stabilize"}
                </span>
              </button>
            </div>

            {/* Stage: Speedbump */}
            <div
              className={`transition-all duration-700 flex flex-col items-center justify-center ${
                stage === "speedbump"
                  ? "opacity-100 relative py-12"
                  : "opacity-0 pointer-events-none absolute inset-0"
              }`}
            >
              {speedbumpTask && (
                <div className="flex flex-col items-center justify-center">
                  <div className="p-4 bg-zinc-900 rounded-2xl mb-6 shadow-lg border border-zinc-800 animate-bounce">
                    <speedbumpTask.icon className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-medium text-zinc-100 mb-2 uppercase tracking-widest text-center">
                    Somatic Speed Bump
                  </h2>
                  <h3 className="text-sm text-emerald-400 mb-8 font-mono">
                    {speedbumpTask.title}
                  </h3>

                  <p className="text-center text-zinc-300 font-light leading-relaxed max-w-sm mb-12 text-lg">
                    {speedbumpTask.instruction}
                  </p>

                  <button
                    onClick={() => handleDissolve(true)}
                    disabled={bumpCountdown > 0}
                    className="px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full hover:bg-emerald-500/20 transition-all disabled:opacity-30 disabled:border-zinc-800 disabled:text-zinc-600 disabled:bg-transparent"
                  >
                    {bumpCountdown > 0
                      ? `Wait ${bumpCountdown}s...`
                      : speedbumpTask.actionText}
                  </button>
                </div>
              )}
            </div>

            {/* Stage: Processing */}
            <div
              className={`transition-all duration-700 flex flex-col items-center justify-center h-48 ${
                stage === "processing"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none absolute inset-0"
              }`}
            >
              <Fingerprint className="w-8 h-8 text-zinc-600 animate-pulse mb-6" />
              <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase text-center">
                {processingText}
              </p>
            </div>

            {/* Stage: Dissolved (Result) */}
            <div
              className={`transition-all duration-1000 transform w-full ${
                stage === "dissolved"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none absolute inset-0"
              }`}
            >
              {result && (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
                  {/* Symbol Header */}
                  <div className="flex items-start gap-4 mb-8 pb-6 border-b border-zinc-800/50">
                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 shadow-inner">
                      {renderIcon(result.archetype)}
                    </div>
                    <div>
                      <h2 className="text-sm font-medium tracking-widest uppercase text-zinc-300 mb-1">
                        {getLabel(result.archetype)}
                      </h2>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>
                  </div>

                  {/* Reflection */}
                  <div className="pl-2 border-l-2 border-zinc-800">
                    <p className="text-zinc-600 text-xs font-light italic mb-4 line-through decoration-zinc-700/50">
                      "{input}"
                    </p>
                    <p className="text-xl text-zinc-100 font-light leading-relaxed">
                      {result.reflection}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleReset}
                className="mt-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-medium tracking-widest uppercase mx-auto"
              >
                <RefreshCw className="w-3 h-3" />
                Reset State
              </button>
            </div>
          </>
        )}
      </div>

      {/* Legend Modal (The Mandala) */}
      {showLegend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-2 sm:p-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-zinc-950/90 backdrop-blur-md pb-4 pt-2 border-b border-zinc-800/50 z-10 px-4 sm:px-0">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-zinc-400" />
                <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-zinc-200">
                  The Mandala
                </h2>
              </div>
              <button
                onClick={() => setShowLegend(false)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 rounded-full hover:bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 sm:px-0">
              {Object.entries(ARCHETYPE_VISUALS).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <div
                    key={key}
                    className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 transition-colors group"
                  >
                    <div
                      className={`p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80 shadow-inner ${config.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium tracking-wide text-zinc-200 mb-1.5">
                        {config.label}
                      </h3>
                      <p className="text-xs font-light text-zinc-500 leading-relaxed">
                        {config.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
