import React from 'react';

const images = [
  'https://plus.unsplash.com/premium_photo-1661883982941-50af7720a6ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8M2QlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://en.idei.club/uploads/posts/2023-12/thumbs/1703070213_en-idei-club-pictures-of-black-houses-dizain-pinterest-19.jpg',
  'https://www.1stclass-homes.com/storage/S3Storage/properties/43327/photos/default/2.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B1zjAWDvVKzn7G48unCHCsWCEWblAWqf0uBTsLpnVJMQODoenq1HmnvTXI3PrND6e4o&usqp=CAU',
  'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://i2.au.reastatic.net/800x600/2386b68883946c09006c83909cfae27cfeb5c285441aca4f06094958321a120f/main.jpg',
];

function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800 mt-8">
      <div className="container mx-auto py-16 px-6 md:px-12 lg:px-24">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-teal-600 text-center mb-10">
          About Prohomes
        </h1>

        {/* Intro Section */}
        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="lg:w-1/2">
            <img
              src="https://img.freepik.com/premium-photo/modern-house-exterior-design_1281315-487.jpg"
              alt="Prohomes"
              className="rounded-lg shadow-lg w-full object-cover h-auto responsive-image"
            />

          </div>
          <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Welcome to Prohomes
            </h2>
            <p className="text-lg text-gray-600">
              Prohomes is your trusted partner in the real estate market, helping you find your dream home. We specialize in residential and commercial properties, offering a wide range of options to suit every need.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our goal is to make the home buying and selling process as seamless as possible. With a team of dedicated professionals and extensive market knowledge, we provide expert guidance to our clients throughout their real estate journey.
            </p>
          </div>
        </div>

        {/* Our Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Mission */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to provide exceptional service and unmatched expertise to our clients, ensuring they find the perfect property that fits their needs and budget.
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a future where everyone has access to the best real estate solutions, making property transactions simple, transparent, and enjoyable for all.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Why Choose Prohomes?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src={images[0]}
                alt="Expertise"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-600">Real Estate Expertise</h3>
              <p className="text-gray-600 mt-2">
                Our team of professionals brings extensive knowledge and experience in the real estate market, ensuring you receive the best advice and options.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src={images[4]}
                alt="Personalized Service"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-600">Personalized Service</h3>
              <p className="text-gray-600 mt-2">
                At Prohomes, we believe in tailored solutions. We listen to your needs and preferences to find properties that truly match your lifestyle.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src={images[2]}
                alt="Client Satisfaction"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-teal-600">Client Satisfaction</h3>
              <p className="text-gray-600 mt-2">
                Your satisfaction is our priority. We strive to exceed your expectations and provide a smooth experience from start to finish.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg" alt="Team Member 1"
                className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-teal-600">Ganesh Patel</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHytcaoXDqynWuboDMnjyJ-kG1mxiWQGGuzzTGOWize35jKiP9VUWvOUhkEZtXYOxexKQ&usqp=CAU"
                alt="Team Member 2"
                className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-teal-600">Surendra Pratap Singh</h3>
              <p className="text-gray-600">CTO & Co-Founder</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://www.shutterstock.com/image-vector/person-gray-photo-placeholder-woman-600nw-1241538838.jpg"
                alt="Team Member 3"
                className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-teal-600">Neema Karki</h3>
              <p className="text-gray-600">Head of Sales</p>
            </div>


          </div>
        </div>
        {/* Customer Testimonials */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">"Prohomes made my home-buying journey incredibly smooth. Their team was knowledgeable, attentive, and genuinely cared about finding the perfect home for me. I couldn't be happier!"</p>
              <p className="mt-4 text-teal-600 font-bold">- Aarti Sharma</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">"I had a fantastic experience selling my property with Prohomes. Their marketing strategy and professional approach led to a quick sale at a great price!"</p>
              <p className="mt-4 text-teal-600 font-bold">- Rajesh Mehta</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">"From the very first meeting, I felt valued as a client. Prohomes guided me through every step, and their expertise was evident. I highly recommend them!"</p>
              <p className="mt-4 text-teal-600 font-bold">- Priya Singh</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">"The team at Prohomes was incredibly responsive and helpful. They listened to my needs and found exactly what I was looking for. Truly a great service!"</p>
              <p className="mt-4 text-teal-600 font-bold">- Amit Jain</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;
