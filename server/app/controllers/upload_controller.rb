class UploadController < ApplicationController

  def create
    if upload_params && upload_params.class.to_s.split("::").last == "UploadedFile"
      filename = upload_params.original_filename
      filename = increment_filename(filename)
      port = request.port == 80 ? "" : ":#{request.port}"
      url = "#{request.protocol}#{request.host}#{port}/videos/#{filename}"

      File.open(video_dir + filename, 'w:ASCII-8BIT') { |file|
        file.write(upload_params.read)
      }

      render json: {
        data: {
          attributes: {
            url: url
          }
        }
      }
    else
      render json: {
        "errors": [
          {
            "status": "422",
            "title":  "No Attached File",
            "detail": "There was no video file attached to the request."
          }
        ]
      }
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
    count = 0
    unique_name = filename
    while File.exist?(video_dir + unique_name) do
      count += 1
      ext = File.extname(filename)
      basename = File.basename(filename, ext)
      unique_name = "#{basename}_#{count}#{ext}"
    end

    unique_name
  end

  def upload_params
    params["0"]
  end
end
