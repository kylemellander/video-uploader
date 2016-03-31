class VideosController < ApplicationController

  def create
    video = Video.new(upload_params)
    if video.valid?
      url = write_file(video.file)

      render json: {
        data: {
          attributes: {
            url: url
          }
        }
      }
    else
      render json: { "errors": video.errors }, status: 422
    end
  end

  private

  def video_dir
    if Rails.env.test?
      'public/test/'
    else
      'public/videos/'
    end
  end

  def increment_filename(filename)
    count = 1
    ext = File.extname(filename)
    unique_name = "#{count}#{ext}"

    while File.exist?("#{video_dir}#{count}#{ext}") do
      count += 1
      unique_name = "#{count}#{ext}"
    end

    unique_name
  end


  def write_file(upload)
    filename = upload.original_filename
    filename = increment_filename(filename)
    port = request.port == 80 ? "" : ":#{request.port}"
    File.open("#{Rails.root}/#{video_dir}#{filename}", 'wb') { |file|
      upload.rewind
      file.write(upload.read)
    }

    "#{request.protocol}#{request.host}#{port}/videos/#{filename}"
  end

  def upload_params
    params.permit("file", "size")
  end

end
