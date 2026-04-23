import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Zap, Code, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Background decoration */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-semibold leading-6 text-yellow-600 ring-1 ring-inset ring-yellow-500/20">
                Latest updates
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
                <ArrowRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Forge Your <span className="text-yellow-500">Brilliance</span> with IDEAFORGE
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The ultimate ecosystem for creators and developers to turn sparks of inspiration into production-ready reality. Build, scale, and innovate with state-of-the-art tooling.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/dashboard/userr">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold flex items-center gap-2">
                Get Started <Rocket className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1 group">
              Learn more <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 rotate-2 hover:rotate-0 transition-transform cursor-default">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Lightbulb className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-xl">Brainstorm</h3>
                  <p className="text-gray-500 text-sm">Capture every spark with our AI-powered ideation engine.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 -rotate-2 hover:rotate-0 transition-transform cursor-default translate-y-8">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Zap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-xl">Rapid Prototype</h3>
                  <p className="text-gray-500 text-sm">Deploy MVP versions of your ideas in seconds, not days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
