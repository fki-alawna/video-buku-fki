interface AdminChatQuickActionsProps {
  actions: string[];
  isLoading: boolean;
  onSelectAction: (action: string) => void;
}

export default function AdminChatQuickActions({
  actions,
  isLoading,
  onSelectAction,
}: AdminChatQuickActionsProps) {
  return (
    <div className="px-5 py-2.5 bg-slate-100/70 border-t border-slate-200/70 flex items-center gap-2 overflow-x-auto shrink-0">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 hidden sm:inline">
        Saran:
      </span>
      {actions.map((action, i) => (
        <button
          key={i}
          type="button"
          disabled={isLoading}
          onClick={() => onSelectAction(action)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-blue-300 hover:text-blue-900 hover:bg-blue-50/50 transition-colors shrink-0 disabled:opacity-50 cursor-pointer shadow-2xs"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
