const TitleLandingPage = ({ title, message }) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
        {title}
      </h2>
      <div className="w-24 h-1 bg-primary-primary mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default TitleLandingPage;
