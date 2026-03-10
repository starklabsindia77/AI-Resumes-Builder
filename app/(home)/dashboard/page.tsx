import AddResume from "../_components/AddResume";
import ImportLinkedIn from "../_components/ImportLinkedIn";
import ResumeList from "../_components/ResumeList";
import TrashListBox from "../_components/TrashListBox";

const Page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Decorative Elements synced with landing page */}
      <div className="absolute inset-0 liquid-mesh opacity-[0.15] dark:opacity-[0.2] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full mx-auto max-w-7xl py-12 px-5">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-500 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                My Resumes
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium mt-3 max-w-xl">
              Design and manage your professional presence with our AI-powered toolkit.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <TrashListBox />
          </div>
        </div>

        <div className="w-full pt-12">
          <h5 className="text-sm uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400 mb-6">
            Recent Work
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AddResume />
            <ImportLinkedIn />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
