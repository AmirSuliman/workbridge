

const Previewannouncments = () =>{

    return(
       
        <main className="space-y-12">
          <div className="flex flex-row items-center justify-between">
             <h1 className="text-[#0F172A] font-semibold  text-[22px]">Preview Announcement</h1>
             <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
              <button className="bg-[#0F172A] p-3 px-4 rounded-lg text-white">Publish Announcement</button>
              <button className="bg-white border p-3 px-4 rounded-lg">Back to Editing</button>
             </div>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h1 className="text-[#0D1322] font-medium text-[32px]">Title for post</h1>
             <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-start sm:items-center mt-4">
                <div className="flex flex-row items-center gap-2">
                    <img src="/Group 1000004576.png" alt="img"/>
                    <p>Posted by: </p>
                    <p className="font-bold">Juliette Nicols</p>

                </div>
                <div className="flex flex-row items-center gap-2">
                    <p>Date: </p>
                    <p className="font-bold">/</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <p>Time:</p>
                    <p className="font-bold">/</p>
                </div>

             </div>
          </div>

          <div className="">
          <h1 className="text-[#0D1322] font-bold text-[22px] mb-2">Exciting News!</h1>
          <p className="mb-14">
            We are thrilled to announce an important update to our Work from Home policy. With the evolving nature of the workplace, we have made some adjustments to better accommodate your needs and ensure a more flexible, productive environment for everyone.
          </p>
          <img
            src="/solen-feyissa-TaOGbz_S-Qw-unsplash.png"
            alt="img"
            className="w-[600px] mb-8  mx-auto"
          />
       </div>
        </main>
    )
}
export default Previewannouncments;