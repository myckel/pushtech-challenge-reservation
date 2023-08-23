FROM ruby:3.2.0

# Set environment variables
ENV RAILS_ROOT /app
ENV BUNDLE_PATH /gems

# Set the working directory inside the Docker image
WORKDIR $RAILS_ROOT

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs

# If you need to install MongoDB client tools you can use the following:
# RUN apt-get update -qq && apt-get install -y nodejs mongodb-clients

# Copy Gemfile and Gemfile.lock before other files
# Utilise Docker cache to skip bundle install if Gemfile hasn't changed
COPY Gemfile Gemfile.lock ./

# Install gems
RUN gem install bundler && bundle install

# Copy the main application.
COPY . ./

# Expose the port the app runs on
EXPOSE 3000
