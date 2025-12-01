
'use client'
import PublicPageTemplate from '../templates/PublicPageTemplate'
const ContactUs = () => {
    return (
        <>
            <PublicPageTemplate>

                <div className="bg-gray-100">
                    <div className="max-w-6xl mx-auto  py-16 px-6">
                        <h2 className="text-4xl font-bold text-center text-steel">Contact Us</h2>
                        <p className="text-center text-gray-500 mt-2">Any question or remarks? Just write us a message!</p>

                        <div className="mt-12 flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden p-2">
                            {/* Left Box */}
                            <div className="bg-steel text-white w-full md:w-1/3 p-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                                    <p className="text-sm mb-6">Say something to start a live chat!</p>
                                </div>

                                <div className="space-y-6 text-sm">
                                    <div className="flex items-center space-x-3">
                                        📞 <span>9874522221</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        📧 <span>demo@gmail.com</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        📍 <span>Jaipur Rajasthan India</span>
                                    </div>
                                </div>


                                <div className="flex space-x-4 mt-10">
                                    <a href="#" className="text-white">🐦</a>
                                    <a href="#" className="text-white">📘</a>
                                    <a href="#" className="text-white">📷</a>
                                </div>
                            </div>

                            {/* Right Form */}
                            <div className="w-full md:w-2/3 p-10">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm mb-1">First Name</label>
                                            <input type="text" className="w-full border-b-2 outline-none bg-transparent" placeholder="John" />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">Last Name</label>
                                            <input type="text" className="w-full border-b-2 outline-none bg-transparent" placeholder="Doe" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm mb-1">Email</label>
                                            <input type="email" className="w-full border-b-2 outline-none bg-transparent" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm mb-1">Phone Number</label>
                                            <input type="text" className="w-full border-b-2 outline-none bg-transparent" placeholder="+1 012 3456 789" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-2">Select Subject?</label>
                                        <div className="flex flex-wrap gap-4">
                                            {['General Inquiry', 'Support', 'Feedback', 'Others'].map((label, idx) => (
                                                <label key={idx} className="flex items-center space-x-2">
                                                    <input type="radio" name="subject" className="accent-steel" defaultChecked={idx === 0} />
                                                    <span>{label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">Message</label>
                                        <textarea rows={1} className="w-full border-b-2 outline-none bg-transparent" placeholder="Write your message..." />
                                    </div>

                                    <div className='text-right'>
                                        <button type="submit" className="bg-steel text-white px-6 py-2 rounded-lg shadow hover:bg-oxford">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </PublicPageTemplate>
        </>
    )
}

export default ContactUs
